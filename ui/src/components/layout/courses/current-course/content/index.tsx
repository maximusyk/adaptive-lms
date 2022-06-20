// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ILecture } from '@general-types/lecture.type';
import { useAppSelector } from '@hooks/redux.hook';
import { lectureAPI } from '@services/lecture.service';
import { Button, Layout, PageHeader } from 'antd';
// @ts-ignore
import { Editor as ClassicEditor } from 'ckeditor5-extended-classic-math';
import { useEffect, useState } from 'react';
import { MdEditNote, VscSaveAs } from 'react-icons/all';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EventInfo } from 'framer-motion';

interface ILectureContent {
    isEditMode?: boolean;
}

interface IExtraButtons {
    ghostTitle: string;
    primaryTitle: string;
    ghostClickHandler: () => void;
    primaryClickHandler: () => void;
    primaryButtonIcon: JSX.Element;
}

const ExtraButtons = ({
    ghostTitle,
    primaryTitle,
    ghostClickHandler,
    primaryClickHandler,
    primaryButtonIcon,
}: IExtraButtons) => (
    <span className="flex flex-row gap-4" key={ 'header-btns' }>
        <Button
            key={ 'page-header-left' }
            type="ghost"
            className="flex flex-row items-center rounded border-2 hover:text-violet-600 hover:border-violet-600"
            onClick={ ghostClickHandler }
        >
            { ghostTitle }
        </Button>
        <Button
            key={ 'page-header-right' }
            onClick={ primaryClickHandler }
            icon={ primaryButtonIcon }
            className="rounded flex flex-row text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
        >
            { primaryTitle }
        </Button>
    </span>
);

export const LectureContent = ({ isEditMode = false }: ILectureContent) => {
    const { lecture_id } = useParams();
    const [ lectureContent, setLectureContent ] = useState('');
    const [ editedContent, setEditedContent ] = useState('');
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const actualLecture = useAppSelector(
        (state) => state.subdivisions.item,
    ) as ILecture;

    const [ updateLectureContent ] = lectureAPI.useEditLectureMutation();

    const [ readLecture, { data, error, isLoading } ] =
        lectureAPI.useLazyReadLectureQuery();
    useEffect(() => {
        if ( data && !isLoading ) setLectureContent(data);
        if ( error && !isLoading && 'data' in error )
            setLectureContent(error?.data as string);
    }, [ data, error, isLoading ]);

    useEffect(() => {
        if ( actualLecture && actualLecture.fileId ) {
            readLecture(actualLecture.fileId);
        }
    }, [ lecture_id, actualLecture ]);

    const handleUpdateContent = async () => {
        if ( lectureContent !== editedContent ) {
            const fd = new FormData();
            const newContent = new Blob([ editedContent ], {
                type: 'text/html',
            });
            fd.append('lecture_id', lecture_id as string);
            fd.append('_id', actualLecture.fileId);
            fd.append('content', newContent);
            await updateLectureContent(fd);
        }
        triggerEditMode();
    };

    const triggerUnitView = () => {
        navigate('units');
    };

    const triggerEditMode = () => {
        if ( pathname.includes('edit') ) {
            return navigate(-1);
        }
        navigate('edit');
    };

    return (
        <>
            <PageHeader
                className="px-5 py-0 w-100"
                onBack={ () => navigate(-1) }
                title={ actualLecture.title }
                extra={ ExtraButtons({
                    ghostTitle: isEditMode ? 'Back' : 'Units',
                    primaryTitle: isEditMode ? 'Save' : 'Edit',
                    ghostClickHandler: isEditMode
                        ? triggerEditMode
                        : triggerUnitView,
                    primaryClickHandler: isEditMode
                        ? handleUpdateContent
                        : triggerEditMode,
                    primaryButtonIcon: isEditMode ? (
                        <VscSaveAs size={ '1.1rem' } />
                    ) : (
                        <MdEditNote size={ '1.1rem' } />
                    ),
                }) }
            />
            <Layout.Content className="main-content h-4/5 overflow-auto mr-5 mt-6">
                { isEditMode ? (
                    <CKEditor
                        editor={ ClassicEditor }
                        data={ lectureContent }
                        onChange={ (event: EventInfo, editor: ClassicEditor) => {
                            setEditedContent(editor.getData());
                        } }
                    />
                ) : (
                    <div
                        className={ 'main-content' }
                        dangerouslySetInnerHTML={ {
                            __html: lectureContent as string,
                        } }
                    />
                ) }
            </Layout.Content>
        </>
    );
};
