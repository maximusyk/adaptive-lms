import { IQuizAnswer, QuestionTypeEnum } from '@general-types/quiz.type';
import { FC } from 'react';
import { QuizAnswerItem } from './quiz-answer-item';

interface IQuizAnswersList {
    questionType: QuestionTypeEnum;
    answers: IQuizAnswer[];
}

export const QuizAnswersList: FC<IQuizAnswersList> = ({
    questionType,
    answers,
}) => {
    return (
        <div className="flex flex-col gap-1 text-sm">
            { answers.map((answer) => (
                <QuizAnswerItem
                    key={ answer._id }
                    questionType={ questionType }
                    answerTitle={ answer.title }
                    isCorrect={ answer.isCorrect }
                />
            )) }
        </div>
    );
};
