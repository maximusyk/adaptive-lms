import { setStudentQuizStatus } from '@features/student-quiz.feature';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { Button } from 'antd';
import moment from 'moment';
import { FC } from 'react';
import { IQuiz } from '@general-types/quiz.type';

export const QuizStudentWelcome: FC = () => {
    const questionCount = useAppSelector((state) => state.quizzes.list.length);
    const quizConfig = useAppSelector(
        (state) => {
            const subdivisionItem = state.subdivisions.item as IQuiz;
            return subdivisionItem?.config;
        },
    );
    const quizAttempts = quizConfig?.attempts;
    const quizTimeDuration = quizConfig?.duration;
    const quizVisibilityRange = quizConfig?.visibilityRange;

    const userScore = useAppSelector((state) => {
        const quiz = state.subdivisions.item as IQuiz;
        if ( !quiz?.results?.length ) return null;
        return quiz?.results?.find(({ user }) => user === state.users.item._id)?.score;
    });
    const getDuration = () => {
        if ( !quizTimeDuration ) return '--:--';
        let duration = '';
        const time = moment(quizTimeDuration);
        duration += time.hours().toString().length > 1 ? `${ time.hours().toString() }:` : `0${ time.hours() }:`;
        duration += time.minutes().toString().length > 1 ? `${ time.minutes().toString() }` : `0${ time.minutes() }`;
        return duration;
    };
    const dispatch = useAppDispatch();
    const getVisibilityRange = () => {
        if (
            !quizVisibilityRange ||
            !quizVisibilityRange.start ||
            !quizVisibilityRange.end
        )
            return {
                start: 'Quiz is open from --.--.----, --:--',
                end: 'to --.--.----, --:--',
            };
        return {
            start: (
                <>
                    { 'Quiz is open from ' }
                    <span className="font-bold text-green-600">
                        { moment(quizVisibilityRange.start).format(
                            'DD.MM.YYYY HH:mm',
                        ) }
                    </span>
                </>
            ),
            end: (
                <>
                    { ' to ' }
                    <span className="font-bold text-green-600">
                        { moment(quizVisibilityRange.end).format(
                            'DD.MM.YYYY HH:mm',
                        ) }
                    </span>
                </>
            ),
        };
    };

    return (
        <div className="text-center">
            <p>{ `Attempts remained: ${ quizAttempts }/${ quizAttempts }` }</p>
            { userScore !== null && (
                <p>{ `Your score: ${ userScore }/100` }</p>
            ) }
            <p>{ `Questions: ${ questionCount }` }</p>
            <p>{ `Duration: ${ getDuration() }` }</p>
            <p>
                { getVisibilityRange().start }
                { getVisibilityRange().end }
            </p>
            <Button
                // key={'page-header-middle'}
                onClick={ () => dispatch(setStudentQuizStatus('in-progress')) }
                // icon={<MdEditNote size={'1.2rem'} />}
                className="text-center m-auto mt-10 text-violet-600 border-2 border-violet-600 hover:border-transparent hover:rounded-md hover:text-white hover:bg-violet-400"
            >
                { 'Start' }
            </Button>
        </div>
    );
};
