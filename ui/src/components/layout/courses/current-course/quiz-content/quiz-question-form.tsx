import { IQuizAnswer, IQuizQuestion, QuestionTypeEnum } from '@general-types/quiz.type';
import { quizAPI } from '@services/quiz.service';
import { Button, Checkbox, Form, Input, Radio } from 'antd';
import FormBuilder from 'antd-form-builder';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface QuizQuestionForm {
    question: IQuizQuestion;
}

interface IVariantsEdit {
    value: IQuizAnswer[];
    type: string;
    onChange: (value: IQuizAnswer[]) => void;
}

const VariantsEdit = ({ value: values, onChange, type }: IVariantsEdit) => {
    return {
        single: (
            <Radio.Group
                onChange={ (v) =>
                    onChange([
                        ...values.map((value) => ({
                            ...value,
                            isCorrect: value._id === v.target.value,
                        })),
                    ])
                }
                className={ 'flex flex-col gap-4' }
                value={ values.find(({ isCorrect }) => isCorrect)?._id }
            >
                { values.map((value) => (
                    <Radio key={ value._id } value={ value._id }>
                        <Input
                            data-variant-id={ value._id }
                            value={ value.title }
                            onChange={ (v) =>
                                onChange([
                                    ...values.map((value) => ({
                                        ...value,
                                        title:
                                            value._id ===
                                            v.target.dataset.variantId
                                                ? v.target.value
                                                : value.title,
                                    })),
                                ])
                            }
                        />
                    </Radio>
                )) }
            </Radio.Group>
        ),
        multiple: (
            <Checkbox.Group
                onChange={ (v) =>
                    onChange([
                        ...values.map((value) => ({
                            ...value,
                            isCorrect: v.includes(value._id),
                        })),
                    ])
                }
                className={ 'flex flex-col gap-4' }
                value={ values
                .filter(({ isCorrect }) => isCorrect)
                .map(({ _id }) => _id) }
            >
                { values.map((value) => (
                    <Checkbox key={ value._id } value={ value._id }>
                        <Input defaultValue={ value.title } />
                    </Checkbox>
                )) }
            </Checkbox.Group>
        ),
        input: (
            <Input
                onChange={ (v) =>
                    onChange([ { ...values[0], title: v.target.value } ])
                }
                defaultValue={ values[0].title }
            />
        ),
    }[type];
};

export const QuizQuestionForm: FC<QuizQuestionForm> = ({ question }) => {
    const [ form ] = Form.useForm();
    const navigate = useNavigate();
    const [ quizData, setQuizData ] = useState({
        ...question,
        type: question.type!.title,
    });

    const { quiz_id } = useParams();

    const [ handleQuestionUpdate ] = quizAPI.useUpdateQuestionMutation();
    const [ handleQuestionAnswersUpdate ] =
        quizAPI.useUpdateQuestionAnswersMutation();

    useEffect(() => { console.log(quizData, question);}, [ quizData ]);

    const meta = {
        initialValues: quizData,
        fields: [
            { key: 'title' },
            {
                key: 'type',
                widget: 'select',
                options: [ 'single', 'multiple', 'input' ],
                onChange: (type: QuestionTypeEnum) => {
                    form.setFieldsValue({ type });
                    setQuizData({ ...quizData, type });
                },
            },
            {
                key: 'answers',
                forwardRef: true,
                widget: VariantsEdit,
                widgetProps: {
                    initialValues: question.answers,
                    type: quizData.type,
                },
                initialValue: question.answers,
            },
        ],
    };

    const toggleQuizEdit = () => {
        navigate(-1);
    };

    const handleQuizUpdate = async (values: IQuizQuestion) => {
        const { answers: answersUpdateData, ...questionUpdateData } = values;
        await handleQuestionAnswersUpdate({ answers: answersUpdateData! });
        await handleQuestionUpdate({
            ...questionUpdateData,
            _id: answersUpdateData![0].question,
        } as IQuizQuestion);
        toggleQuizEdit();
    };

    return (
        <Form form={ form } onFinish={ handleQuizUpdate }>
            <FormBuilder form={ form } meta={ meta as FormBuilder.Meta } />
            <div className="flex flex-row gap-2 justify-end items-center">
                <Button
                    type="ghost"
                    onClick={ toggleQuizEdit }
                    className="flex flex-row items-center rounded border-2 hover:text-violet-600 hover:border-violet-600"
                >
                    { 'Cancel' }
                </Button>
                <Button
                    htmlType={ 'submit' }
                    className="rounded flex flex-row text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                >
                    { 'Save' }
                </Button>
            </div>
        </Form>
    );
};
