import { setQuizList } from '@features/quizzes.feature';
import { IQuizConfig, IQuizFormResult, IQuizQuestion } from '@general-types/quiz.type';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { useToggle } from '@hooks/toggle.hook';
import { quizAPI } from '@services/quiz.service';
import { Button, Empty, Form, PageHeader } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BiLayerPlus, RiListSettingsLine } from 'react-icons/all';
import { useNavigate, useParams } from 'react-router-dom';
import { CountDownTime } from '@componentsUI/countdown-timer/countdown-time';
import { QuizConfigModal } from './quiz-config-modal';
import { QuizQuestionsList } from './quiz-questions-list';
import { QuizStudentResult } from './quiz-student-result';
import { QuizStudentTesting } from './quiz-student-testing';
import { QuizStudentWelcome } from './quiz-student-welcome';
import { setStudentQuizStatus } from '@features/student-quiz.feature';
import { unitAPI } from '@services/unit.service';

interface IExtraButtons {
    ghostClickHandler: () => void;
    primaryClickHandler: () => void;
    isStudent: boolean;
    isQuizInProgress: boolean;
    duration: string;
    finishTime: () => void;
}

const ExtraButtons = ({
    ghostClickHandler,
    primaryClickHandler,
    isStudent,
    isQuizInProgress,
    duration,
    finishTime,
}: IExtraButtons) => (
    <span className="flex flex-row gap-4" key={ 'header-btns' }>
        { isStudent && isQuizInProgress && (
            <CountDownTime
                initialTime={ moment()
                .add(moment(duration).minutes(), 'minutes')
                .add(moment(duration).hours(), 'hours').toString() }
                onFinish={ finishTime }
            />
        ) }
        { !isStudent && (
            <>
                <Button
                    key={ 'page-header-left' }
                    type="ghost"
                    icon={ <BiLayerPlus size={ '1.1rem' } /> }
                    className="flex flex-row items-center rounded gap-1 border-2 hover:text-violet-600 hover:border-violet-600"
                    onClick={ ghostClickHandler }
                >
                    Add More
                </Button>
                <Button
                    key={ 'page-header-right' }
                    onClick={ primaryClickHandler }
                    icon={ <RiListSettingsLine size={ '1.1rem' } /> }
                    className="rounded flex flex-row text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                >
                    Configure
                </Button>
            </>
        ) }
    </span>
);

export const QuizContent = () => {
    const [ studentQuizForm ] = Form.useForm();
    const navigate = useNavigate();
    const [ actualQuestions, setActualQuestions ] = useState<IQuizQuestion[]>([]);
    const actualUserRole = useAppSelector((state) => state.users.item.role);
    const [ studentQuestionAnswers, setStudentQuestionAnswers ] = useState<IQuizQuestion[]>([]);

    const { chapter_id, quiz_id } = useParams();
    const quizTitle = useAppSelector((state) => state.subdivisions.item.title);
    const questions = useAppSelector((state) => state.quizzes.list);
    const dispatch = useAppDispatch();
    const [ isConfigModalOpen, toggleConfigModal ] = useToggle(false);

    const studentQuizStatus = useAppSelector(
        (state) => state.studentQuiz.status,
    );

    const [ configForm ] = Form.useForm();

    const { data: quizItem } = quizAPI.useGetQuizQuery(quiz_id as string);
    // const { data: units } = !studentQuizStatus.length
    //     ? unitAPI.useGetUnitsByChapterQuery(chapter_id as string)
    //     : [];

    const [ quizUpdateHandler ] = quizAPI.useUpdateQuizMutation();
    const [ fetchStudentQuestions ] = quizAPI.useLazyGetStudentQuestionsQuery();
    const [ checkQuizResult ] = quizAPI.useCheckQuizResultMutation();
    unitAPI.useGetUnitsByChapterQuery(chapter_id as string);

    useEffect(() => {
        if ( actualUserRole === 'student' ) fetchStudentQuestions(quiz_id as string);
    }, [ actualUserRole ]);

    useEffect(() => {
        if ( quizItem ) {
            dispatch(setQuizList(quizItem.questions));
        }
    }, [ quizItem ]);

    useEffect(() => {
        if ( questions ) {
            setActualQuestions(questions || []);
        }
    }, [ questions ]);

    const cancelConfiguration = () => {
        toggleConfigModal();
        configForm.resetFields();
    };

    const submitConfiguration = async (values: any) => {
        const formatedValues: IQuizConfig = {
            ...values,
            duration: values.duration.toString(),
            visibilityRange: {
                start: values.visibilityRange[0].toString(),
                end: values.visibilityRange[1].toString(),
            },
        };
        if ( quizItem )
            await quizUpdateHandler({
                ...quizItem,
                config: { ...formatedValues },
            });
        toggleConfigModal();
        configForm.resetFields();
    };

    const triggerAddMore = () => {
        console.log('add more');
        // const rawQuestion: IQuizQuestion = {
        //     _id: 'new',
        //     answers: [],
        //     quiz: quiz_id,
        //     title: '',
        //     units: [],
        //     type: '',
        // };
        // setActualQuestions((prev) => [rawQuestion, ...prev]);
    };

    const finishQuiz = () => {
        studentQuizForm.submit();
    };

    const onQuestionAnswerChange = async (values: IQuizFormResult) => {
        const filteredAnswers: Pick<IQuizQuestion, '_id' | 'answers'>[] = [];
        for ( const key in values ) {
            if ( values[key].some(({ isCorrect }) => isCorrect) ) {
                const cleanedAnswers = values[key].filter((answer) => answer.isCorrect);
                filteredAnswers.push({
                    _id: key,
                    answers: cleanedAnswers,
                });
            }
        }

        await checkQuizResult({ quizId: quiz_id!, answers: filteredAnswers });
        dispatch(setStudentQuizStatus('result'));
        // await checkQuizResult({
        //     quizId: quiz_id!,
        //     answers: filteredAnswers,
        // });
        // dispatch(setStudentQuizStatus('result'));
        // const result: IQuizQuestion[] = [];
        // values.forEach((value) => {
        //     const questionId = value.answers[0].question;
        //     result.push({
        //         _id: questionId,
        //         answers: value.answers,
        //     });
        // });
        // setStudentQuestionAnswers(result);
    };

    return (
        <>
            <PageHeader
                className="px-5 py-0 w-100"
                onBack={ () => navigate(-1) }
                title={ quizTitle }
                extra={ ExtraButtons({
                    ghostClickHandler: triggerAddMore,
                    primaryClickHandler: toggleConfigModal,
                    isStudent: actualUserRole === 'student',
                    isQuizInProgress: studentQuizStatus === 'in-progress',
                    duration: quizItem?.config?.duration as string,
                    finishTime: finishQuiz,
                }) }
            />
            <div className="main-content h-full overflow-auto mr-5 mt-6">
                { actualUserRole === 'student' ? (
                    <>
                        { studentQuizStatus === 'start' && (
                            <QuizStudentWelcome />
                        ) }
                        { studentQuizStatus === 'in-progress' && (
                            <QuizStudentTesting
                                form={ studentQuizForm }
                                onFinish={ onQuestionAnswerChange }
                            />
                        ) }
                        { studentQuizStatus === 'result' && (
                            <QuizStudentResult />
                        ) }
                    </>
                ) : (
                    <>
                        <QuizConfigModal
                            defaultValues={ quizItem?.config }
                            configForm={ configForm }
                            onCancel={ cancelConfiguration }
                            submitConfig={ submitConfiguration }
                            visible={ isConfigModalOpen }
                        />
                        { actualQuestions?.length ? (
                            <QuizQuestionsList questions={ actualQuestions } />
                        ) : (
                            <Empty
                                description="No available Quizzes"
                                image={ Empty.PRESENTED_IMAGE_SIMPLE }
                            />
                        ) }
                    </>
                ) }
            </div>
        </>
    );
};
