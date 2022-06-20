import Dragger from 'antd/lib/upload/Dragger';
import { RcFile, UploadRequestOption } from 'rc-upload/lib/interface';
import { RiUploadCloud2Line } from 'react-icons/all';

interface IFileUpload {
    isDisabled: boolean;

    onFileChange(file: RcFile): void;

    contentType: string;
}

export const FileUpload = ({
    isDisabled,
    onFileChange,
    contentType,
}: IFileUpload) => {
    const dummyRequest = ({ onSuccess }: UploadRequestOption) => {
        setTimeout(() => {
            if ( onSuccess ) onSuccess('ok', undefined);
        }, 0);
    };
    return (
        <Dragger
            accept={
                contentType === 'Lecture'
                    ? '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    : 'application/json'
            }
            className={ `group w-full mb-10 px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border ${
                !isDisabled &&
                'hover:border-2 hover:bg-violet-100 hover:border-violet-600 cursor-pointer hover:text-violet-600'
            }` }
            name="content"
            maxCount={ 1 }
            beforeUpload={ onFileChange }
            customRequest={ dummyRequest }
            disabled={ isDisabled }
            multiple={ false }
        >
            <span
                className={ `grid place-content-center mb-2 ${
                    isDisabled ? 'text-gray-300' : 'group-hover:text-violet-900'
                }` }
            >
                <RiUploadCloud2Line className={ 'text-3xl' } />
            </span>
            <span
                className={ `ant-upload-text ${
                    isDisabled
                        ? 'text-gray-300'
                        : 'group-hover:font-medium group-hover:text-violet-900'
                }` }
            >
                Click or drag file to this area to upload
            </span>
        </Dragger>
    );
};
