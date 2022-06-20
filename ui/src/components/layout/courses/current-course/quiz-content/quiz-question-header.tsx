import { IQuizQuestion } from '@general-types/quiz.type';
import { IUnit } from '@general-types/unit.type';
import { useAppSelector } from '@hooks/redux.hook';
import { useToggle } from '@hooks/toggle.hook';
import { Button, Form } from 'antd';
import { FC, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SelectPreview } from '../../../../ui/select-with-preview';
import { quizAPI } from '@services/quiz.service';

interface IQuizQuestionHeader {
    question: IQuizQuestion;
}

export const QuizQuestionHeader: FC<IQuizQuestionHeader> = ({ question }) => {
    const [ form ] = Form.useForm();
    const [ isBindUnits, toggleBindUnits ] = useToggle(false);
    const [ actualUnits, setActualUnits ] = useState<string[]>(question.units as string[]);

    const { quiz_id, question_id } = useParams();
    const navigate = useNavigate();
    const { pathname, state } = useLocation();

    const unitList: Pick<IUnit, '_id' | 'title' | 'content'>[] = useAppSelector(
        (state) => state.units.list,
    );

    const [ updateQuiz ] = quizAPI.useUpdateQuestionMutation();

    const handleQuestionUpdate = async () => {
        await updateQuiz({ _id: question._id, units: actualUnits });
    };
    const bindUnits = (values: string | string[]) => {
        setActualUnits(values as string[]);
    };
    const closeBindUnits = () => {
        toggleBindUnits();
        setActualUnits(question.units as string[]);
    };
    const toggleQuizEdit = async () => {
        if ( pathname.includes(`${ question._id }/edit`) ) {
            return navigate(-1);
        }
        if ( question_id && question_id !== question._id ) {
            await navigate(-1);
            return navigate(`${ question._id }/edit`, {
                replace: true,
            });
        }
        navigate(`${ question._id }/edit`, { state: { from: pathname } });
    };

    return (
        <div className="flex flex-row items-center justify-between">
            <span className="font-bold text-base">{ question.title }</span>
            <div className="flex flex-row gap-2">
                { isBindUnits ? (
                    <Form form={ form } onFinish={ handleQuestionUpdate } className={ 'flex flex-row gap-3' }>
                        <SelectPreview
                            currentValue={ actualUnits || [] }
                            mode="multi"
                            options={ unitList }
                            onChange={ bindUnits }
                        />
                        <Button
                            onClick={ closeBindUnits }
                            className="flex flex-row items-center rounded gap-1 border-2 hover:text-violet-600 hover:border-violet-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            htmlType="submit"
                            className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                        >
                            Save
                        </Button>
                    </Form>
                ) : (
                    <>
                        <Button
                            onClick={ toggleBindUnits }
                            className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                        >
                            Bind Units
                        </Button>
                        <Button
                            onClick={ toggleQuizEdit }
                            className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                        >
                            Edit
                        </Button>
                    </>
                ) }
            </div>
        </div>
    );
};
