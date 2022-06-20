import { IQuizQuestion } from '@general-types/quiz.type';
import { FC } from 'react';
import { QuizQuestionItem } from './quiz-question-item';

interface IQuizQuestionsList {
    questions: IQuizQuestion[];
}

export const QuizQuestionsList: FC<IQuizQuestionsList> = ({ questions }) => {
    return (
        <div className='border-2 rounded-lg shadow-xl overflow-y-auto'>
            {questions.map((question) => (
                <QuizQuestionItem key={question._id} question={question} />
            ))}
        </div>
    );
};
