import { IQuizConfig } from '@general-types/quiz.type';
import {
    DatePicker,
    Form,
    FormInstance,
    InputNumber,
    Modal,
    TimePicker,
} from 'antd';
import moment from 'moment';
import { FC } from 'react';

interface IQuizConfigModal {
    defaultValues?: IQuizConfig;
    configForm: FormInstance;
    visible: boolean;
    onCancel: () => void;
    submitConfig: (values: unknown) => void;
}

export const QuizConfigModal: FC<IQuizConfigModal> = ({
    defaultValues,
    configForm,
    visible = false,
    submitConfig,
    onCancel,
}) => {
    const handleOk = () => configForm.submit();

    return (
        <Modal
            title='Quiz Configuration'
            visible={visible}
            destroyOnClose={true}
            onCancel={onCancel}
            onOk={handleOk}
        >
            <Form
                form={configForm}
                onFinish={submitConfig}
                initialValues={{
                    ...defaultValues,
                    ...(defaultValues?.duration && {
                        duration: moment(defaultValues.duration),
                    }),
                    ...(defaultValues?.visibilityRange && {
                        visibilityRange: [
                            moment(defaultValues.visibilityRange.start),
                            moment(defaultValues.visibilityRange.end),
                        ],
                    }),
                }}
            >
                <Form.Item name='visibilityRange' label='Visibility Range'>
                    <DatePicker.RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format='DD-MM-YYYY HH:mm'
                    />
                </Form.Item>
                <Form.Item name='duration' label='Duration'>
                    <TimePicker
                        format={'HH:mm'}
                        hourStep={1}
                        minuteStep={10}
                        showNow={false}
                    />
                </Form.Item>
                <Form.Item name='attempts' label='Attempts'>
                    <InputNumber min={1} max={5} />
                </Form.Item>
            </Form>
        </Modal>
    );
};
