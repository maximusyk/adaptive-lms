import { FC } from 'react';
import { useAppSelector } from '@hooks/redux.hook';
import { IQuiz } from '@general-types/quiz.type';

export const QuizStudentResult: FC = () => {
    const userScore = useAppSelector((state) => {
        const quiz = state.subdivisions.item as IQuiz;
        if ( !quiz?.results?.length ) return null;
        return quiz?.results?.find(({ user }) => user === state.users.item._id)?.score;
    });

    return (
        <div className="text-center">
            <h1>You complete the quiz!</h1>
            <b>{ `Your score: ${ userScore }/100` }</b>
            { userScore && userScore >= 75 && (
                <p>Congratulation! You successfully pass the quiz. You can move forward.</p>
            ) }
            { userScore && userScore >= 50 && userScore < 75 && (
                <>
                    <p>Your score is not good enough, you should repeat the material.</p>
                    <p>The system was generated some material you should to repeat.</p>
                    <p>Refresh the page and check out the &#34;- Lecture for repetition -&#34; Subdivision Item to view material for repetition.</p>
                </>
            ) }
            { userScore && userScore < 50 && (
                <>
                    <p>Your score is so bad.</p>
                    <p>You should repeat the previous lectures in more detail.</p>
                </>
            ) }
        </div>
    );
};
