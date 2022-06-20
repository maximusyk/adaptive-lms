import { IQuizAnswer, IQuizFormResult } from '@general-types/quiz.type';
import { Button, Checkbox, Form, FormInstance, Radio } from 'antd';
import FormBuilder from 'antd-form-builder';
import { FC } from 'react';
import { useAppSelector } from '@hooks/redux.hook';

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
                        { value.title }
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
                        { value.title }
                    </Checkbox>
                )) }
            </Checkbox.Group>
        ),
        input: (
            <span>Hello</span>
            // <Input
            //     onChange={(v) =>
            //         onChange([{ ...values[0], title: v.target.value }])
            //     }
            // />
        ),
    }[type];
};

interface IQuizStudentTestion {
    form: FormInstance;

    onFinish(values: IQuizFormResult): void;
}

export const QuizStudentTesting: FC<IQuizStudentTestion> = ({ form, onFinish }) => {
    const questions = useAppSelector((state) => state.quizzes.list);

    const getMeta = (question: any) => {
        return {
            fields: [
                {
                    key: question._id,
                    widget: VariantsEdit,
                    widgetProps: {
                        initialValues: question.answers,
                        type: question.type.title,
                    },
                    initialValue: question.answers,
                },
            ],
        };
    };

    return (
        <Form
            form={ form }
            className="flex flex-col gap-1"
            onFinish={ onFinish }
            // onValuesChange={onChange}
        >
            { questions.map((question) => (
                <div key={ question._id }>
                    <p className="text-base">{ question.title }</p>
                    <FormBuilder form={ form } meta={ getMeta(question) } />
                </div>
            )) }
            <Button
                htmlType="submit"
                // loading={isFormLoading}
                className="px-5 text-center m-auto rounded text-white hover:text-white border-0 bg-violet-600 hover:bg-violet-800"
            >
                Submit
            </Button>
        </Form>
    );
};
