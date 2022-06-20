import { IQuizQuestion } from '@general-types/quiz.type';
import { useParams } from 'react-router-dom';
import { QuizAnswersList } from './quiz-answers-list';
import { QuizQuestionForm } from './quiz-question-form';
import { QuizQuestionHeader } from './quiz-question-header';

interface IQuizsItem {
    question: IQuizQuestion;

    // quiz: IQuiz;
    // toggleQuizEdit: (id: string | undefined) => void;
    // isQuizEdit: string | undefined;
    // // toggleBindUnits: (id: string | undefined) => void;
    // isBindUnits: boolean;
    // handleQuizUpdate: (values: FormData, id: IQuiz['_id']) => void;
}

export const QuizQuestionItem = ({ question }: IQuizsItem) => {
    const { question_id } = useParams();

    return (
        // Wrapper
        <div className="border-t-2 first:border-0 p-3 rounded-t-lg flex flex-col gap-5">
            {/* Edit Mode */ }
            { question_id === question._id ? (
                <QuizQuestionForm question={ question } />
            ) : (
                <>
                    {/* Header */ }
                    <QuizQuestionHeader question={ question } />
                    {/* Variant list */ }
                    <QuizAnswersList
                        answers={ question.answers || [] }
                        questionType={ question.type!.title }
                    />
                </>
            ) }
        </div>
    );
};
