import { ApiError } from '@exceptions/api-error.exception';
import { IQuizAnswer, IQuizQuestion, IUnit, IUser } from '@general-types/index.types';
import { Lecture } from '@lectures/entities/lecture.entity';
import lectureService from '@lectures/lecture.service';
import mongoose from 'mongoose';
import { Chapter } from '../chapters/entities/chapter.entity';
import { QuizAnswer } from './entities/quiz-answers.entity';
import { QuizQuestion } from './entities/quiz-questions.entity';
import { QuizType } from './entities/quiz-types.entity';
import { Quiz } from './entities/quiz.entity';

import UserQuizResultService from '@user-quiz-result/user-quiz-result.service';

interface IQuizServiceArgs {
    _id?: string;
    title?: string;
    type?: string;
    course?: string;
    chapter?: string;
    questions?: IQuizQuestion[];
    answers?: IQuizAnswer[];
    results?: string[];
}

class QuizService {
    async create(quizData: IQuizServiceArgs, questions: Express.Multer.File[]) {
        const candidate = await Quiz.findOne({
            $and: [ { title: quizData.title }, { course: quizData.course } ],
        }).exec();

        if ( candidate ) {
            throw ApiError.BadRequest('Quiz with this title already exists');
        }

        const questionsCandidate: IQuizQuestion[] = questions.length
            ? JSON.parse(questions[0].buffer.toString())
            : [];

        if (
            questionsCandidate &&
            questionsCandidate.length &&
            !this.validateQuizQuestions(questionsCandidate)
        ) {
            throw ApiError.BadRequest(
                'Questions is not valid, please make sure you write it correctly',
            );
        }

        const quizId = new mongoose.Types.ObjectId();

        const quizQuestions = questionsCandidate.length
            ? await this.generateQuizData(questionsCandidate, quizId)
            : [];

        if ( 'error' in quizQuestions )
            throw ApiError.BadRequest(quizQuestions.error);

        const quiz = await Quiz.create({
            ...quizData,
            _id: quizId,
            questions: quizQuestions || [],
        });

        await Chapter.findByIdAndUpdate(
            quizData.chapter,
            {
                $push: {
                    subdivisions: {
                        item: quiz._id,
                        subdivisionType: 'quizzes',
                    },
                },
            },
            { new: true },
        ).exec();

        await quiz.save();
        return quiz;
    }

    async generateQuizData(
        questions: IQuizQuestion[],
        quizId: mongoose.Types.ObjectId,
    ): Promise<string[] | { error: string }> {
        const quizQuestions: string[] = [];
        const quizTypes: { [type: string]: string } = await QuizType.getIds();
        if ( quizTypes?.error ) return { error: quizTypes.error };
        for ( const question of questions ) {
            const questionAnswers: string[] = [];
            const questionId = new mongoose.Types.ObjectId();
            for ( const answer of question.answers ) {
                const newAnswer = await QuizAnswer.create({
                    ...answer,
                    quiz: quizId,
                    question: questionId,
                });
                await newAnswer.save();
                questionAnswers.push(newAnswer._id);
            }
            const newQuestion = await QuizQuestion.create({
                ...question,
                answers: questionAnswers,
                type: quizTypes[question.type.toString()],
                quiz: quizId,
                _id: questionId,
            });
            await newQuestion.save();
            quizQuestions.push(newQuestion._id);
        }
        return quizQuestions;
    }

    async update(data: IQuizServiceArgs) {
        const quiz = await Quiz.findById(data._id).exec();

        if ( !quiz ) {
            throw ApiError.NotFoundError();
        }

        const updatedQuiz = await quiz.update({ ...data }, { new: true }).exec();

        return { status: 200, body: updatedQuiz };
    }

    async updateQuestion(data: IQuizServiceArgs) {
        const quizQuestion = await QuizQuestion.findById(data._id).exec();

        if ( !quizQuestion ) {
            throw ApiError.NotFoundError();
        }

        if ( data.type ) {
            const questionType = await QuizType.findOne({
                title: data.type,
            }).exec();

            if ( !questionType ) {
                throw ApiError.BadRequest('Question type does not exist');
            }

            data.type = questionType._id;
        }

        const updatedQuizQuestion = await quizQuestion.update({ ...data }, { new: true }).exec();

        return { status: 200, body: updatedQuizQuestion };
    }

    async getQuestionsByQuizId(_user: Pick<IUser, '_id' | 'role'>, quizId: string) {
        const questions = await QuizQuestion.find({ quiz: quizId }).populate('type answers').exec();

        if ( !questions || !questions.length ) throw ApiError.NotFoundError();

        const shuffledQuestions = await this.shuffleQuestions(questions);

        return shuffledQuestions.map(({ _id, title, type, answers }) => ({
            _id,
            title,
            type,
            answers: answers.map((answer) => ({
                _id: answer._id,
                title: answer.title,
                isCorrect: false,
            })),
        }));
    }

    async shuffleQuestions(questions: IQuizQuestion[]) {
        return [ ...questions ].sort(() => Math.random() - 0.5);
    }

    async shuffleAnswers(answers: IQuizAnswer[]) {
        return [ ...answers ].sort(() => Math.random() - 0.5);
    }

    async updateAnswers(data: IQuizServiceArgs) {
        const answersToUpdate = await QuizAnswer.find({
            question: data._id,
        }).exec();

        for ( const answer of answersToUpdate ) {
            const newAnswerDataIndex = data?.answers?.findIndex(
                ({ _id }) => answer._id.toString() === _id.toString(),
            );
            await answer.update({ ...data?.answers?.at(newAnswerDataIndex as number) }, { new: true }).exec();
        }

        return { status: 200, body: { success: true } };
    }

    async getAll() {
        const quizzes = await Quiz.find().populate('questions').exec();

        return { status: 200, body: quizzes };
    }

    async getOne(id: string) {
        const quiz = await Quiz.findById(id).exec();

        if ( !quiz ) {
            return {
                status: 404,
                body: { message: 'Quiz not found' },
            };
        }

        return { status: 200, body: quiz };
    }

    async remove(id: string) {
        const candidate = await Quiz.findById(id).exec();
        if ( !candidate ) {
            return {
                status: 404,
                body: { message: 'Provided quiz doesn`t exists' },
            };
        }

        await candidate.remove();

        return { status: 200, body: { success: true } };
    }

    async getQuestionsOnly(id: string) {
        const quiz = await Quiz.findById(id).exec();

        if ( !quiz ) {
            return {
                status: 404,
                body: { message: 'Quiz not found' },
            };
        }

        const questions = quiz.questions.map(({ title, type, answers }) => ({
            title,
            type,
            answers: answers.map((answer) => answer.title),
        }));

        return { status: 200, body: questions };
    }

    private getScore(
        studentQuestions: IQuizQuestion[],
        correctAnswers: {
            _id: string;
            type: 'single' | 'multiple' | 'input';
            units: IUnit[] | string[];
            answers: string[];
        }[],
        scorePerQuestion: number,
    ) {
        let finalScore = 0;
        const units: any[] = [];

        studentQuestions.forEach(({ _id, answers }) => {
            const checkQuestionIndex = correctAnswers.map(({ _id: correctQuestionId }) => correctQuestionId.toString()).indexOf(
                _id);
            if ( checkQuestionIndex === -1 ) return;

            const questionType = correctAnswers[checkQuestionIndex].type;

            if ( questionType === 'multiple' ) {
                correctAnswers[checkQuestionIndex].answers.forEach(
                    (correctAnswer) => {
                        if (
                            answers.map(({ title }) => title).includes(correctAnswer)
                        ) {
                            finalScore +=
                                10 /
                                correctAnswers[checkQuestionIndex].answers
                                    .length;
                        } else {
                            units.push(...correctAnswers[checkQuestionIndex].units);
                        }
                    },
                );
            } else {
                if (
                    correctAnswers[checkQuestionIndex].answers.includes(
                        answers?.at(0)?.title || '',
                    )
                ) {
                    finalScore += scorePerQuestion;
                } else {
                    units.push(...correctAnswers[checkQuestionIndex].units);
                }
            }
        });

        return { finalScore: Math.round(finalScore), units };
    }

    async checkResults(id: string, studentQuestions: IQuizQuestion[], { _id: studentId }: IUser) {
        const questions = await QuizQuestion.find({ quiz: id }).populate('type answers units').exec();

        if ( !questions || !questions.length ) throw ApiError.NotFoundError();

        const correctAnswers = questions.map(
            ({ _id, type, answers, units }) => ({
                _id,
                type: type.title,
                units,
                answers: answers.map(({ title, isCorrect }) =>
                    isCorrect ? title : '',
                ),
            }),
        );

        const scorePerQuestion = 100 / questions.length;
        const { finalScore, units: rawUnits } = this.getScore(
            studentQuestions,
            correctAnswers,
            scorePerQuestion,
        );

        const quiz = await Quiz.findById(id).exec();
        if ( quiz ) {
            const quizConfig = quiz.config;
            if ( quizConfig ) {
                await quiz.update({ 'config.attempts': quizConfig.attempts - 1 }).exec();
            }
        }

        await UserQuizResultService.setResult({ quizId: id, userId: studentId, score: Math.round(finalScore) });

        // Generate material if score in range
        if ( finalScore >= 50 && finalScore < 75 ) {
            await this.generateMaterialForRepetition(rawUnits, quiz!.chapter);
            return finalScore;
        }

        return finalScore;
    }

    async generateMaterialForRepetition(
        generatedUnits: IUnit[],
        chapterId: string,
    ) {
        const chapter = await Chapter.findById(chapterId).exec();

        console.log(`Chapter exists: ${ !!chapter }`);

        if ( !chapter ) throw ApiError.NotFoundError();

        const finalUnitIds = this.sortByFrequencyAndRemoveDuplicates(
            generatedUnits.map(({ _id }) => _id),
        );

        let lectureContent = '';

        for ( const unitId of finalUnitIds ) {
            const unit = generatedUnits.find(({ _id }) => _id === unitId);

            lectureContent += unit?.content || '';
        }

        console.log(`Lecture length: ${ lectureContent.length }`);

        const lectureBuffer = Buffer.from(lectureContent, 'utf-8');

        console.log('Lecture buffer');
        console.log(lectureBuffer);

        const { Key: lectureFileId } = await lectureService.uploadLectureFile(
            lectureBuffer,
        );

        const lecture = await Lecture.create({
            chapter: chapter._id,
            fileId: lectureFileId,
            title: '- Lecture for repetition -',
            viewable: true,
            units: finalUnitIds,
        });

        await chapter.updateOne({
            $push: {
                subdivisions: {
                    item: lecture._id,
                    subdivisionType: 'lectures',
                },
            },
        }).exec();
    }

    sortByFrequencyAndRemoveDuplicates(array: string[]): string[] {
        const frequency: { [value: string]: number } = {};

        // compute frequencies of each value
        for ( const value of array ) {
            if ( value in frequency ) {
                frequency[value]++;
            } else {
                frequency[value] = 1;
            }
        }

        // make array from the frequency object to de-duplicate
        const uniques: string[] = [];
        for ( const value in frequency ) {
            uniques.push(value);
        }

        // sort the uniques array in descending order by frequency
        function compareFrequency(a: string, b: string) {
            return frequency[b] - frequency[a];
        }

        return uniques.sort(compareFrequency);
    }

    validateQuizQuestions(questions: IQuizQuestion[]) {
        questions.forEach((question) => {
            if ( !question.title.length ) return false;
            if ( question.answers.some(({ title }) => title.length < 6) )
                return false;
            switch ( question.type.title ) {
                case 'single':
                    if (
                        question.answers.filter(({ isCorrect }) => isCorrect)
                            .length !== 1
                    )
                        return false;
                    break;
                case 'multiple':
                    if (
                        question.answers.filter(({ isCorrect }) => isCorrect)
                            .length < 2 ||
                        question.answers.length ===
                        question.answers.filter(
                            ({ isCorrect }) => !isCorrect,
                        ).length
                    )
                        return false;
                    break;
                case 'input':
                    if (
                        question.answers.length > 1 ||
                        question.answers.filter(({ isCorrect }) => isCorrect)
                            .length !== 1
                    )
                        return false;
                    break;
            }
        });

        return true;
    }
}

export default new QuizService();
