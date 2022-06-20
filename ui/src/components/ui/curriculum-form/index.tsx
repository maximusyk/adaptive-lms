import { Form, FormInstance } from 'antd';
import FormBuilder from 'antd-form-builder';
import { RcFile } from 'rc-upload/lib/interface';
import { getCurriculumMeta } from './chapterMeta';
import { FileUpload } from './file-upload';

interface ICurriculumForm {
    form: FormInstance;
    isChapterForm: boolean;
    contentType?: string;
}

export const CurriculumForm = ({
    form,
    isChapterForm,
    contentType = 'Lecture',
}: ICurriculumForm) => {
    const formMeta = getCurriculumMeta(isChapterForm);

    const onFileChange = (file: RcFile) => {
        form.setFieldsValue({ content: file });
    };

    return (
        <>
            <FormBuilder form={form} meta={formMeta} />
            {!isChapterForm && (
                <Form.Item name='content'>
                    <FileUpload
                        isDisabled={false}
                        contentType={contentType}
                        onFileChange={onFileChange}
                    />
                </Form.Item>
            )}
        </>
    );
};
