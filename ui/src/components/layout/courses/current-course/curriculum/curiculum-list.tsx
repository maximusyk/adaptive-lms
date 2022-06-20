import { unsetActualChapter } from '@features/chapters.feature';
import { IChapter } from '@general-types/chapter.type';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { chapterAPI } from '@services/chapter.service';
import { Button, Collapse } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import { MouseEvent, useEffect, useState } from 'react';
import { BsGearFill, IoIosArrowForward } from 'react-icons/all';
import { useNavigate, useParams } from 'react-router-dom';
import { CurriculumModal } from '../../../../ui/curriculum-modal';
import '../index.scss';
import { SubdivisionList } from './subdivision-list';

interface ICurriculumList {
    triggerSubdivisionForm(): void;
}

export const CurriculumList = ({ triggerSubdivisionForm }: ICurriculumList) => {
    const { chapter_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const [ chapterForm ] = useForm();

    const actualUserRole = useAppSelector((state) => state.users.item.role);
    const actualChapter = useAppSelector((state) => state.chapters.item);
    const actualChapters = useAppSelector((state) => state.chapters.list);
    const actualSubdivisionList = useAppSelector(
        (state) => state.subdivisions.list,
    );

    const [ fetchChapter ] = chapterAPI.useLazyGetChapterQuery();
    const [ updateChapter ] = chapterAPI.useUpdateChapterMutation();
    const [ removeChapter ] = chapterAPI.useDeleteChapterMutation();

    useEffect(() => {
        if ( chapter_id && chapter_id !== actualChapter?._id ) {
            fetchChapter(chapter_id);
        }
    }, []);

    const triggerModalClose = () => {
        setModalVisible(false);
        chapterForm.resetFields();
    };

    const triggerChapterCollapse = (chapterId: string | string[]) => {
        if ( !chapterId && chapterId !== chapter_id ) {
            navigate(-1);
            dispatch(unsetActualChapter());
            return;
        }
        navigate(`chapters/${ chapterId }`);
        fetchChapter(chapterId as string);
    };

    const triggerChapterEdit = (event: MouseEvent, chapterId: string) => {
        event.stopPropagation();
        triggerChapterCollapse(chapterId);
        setModalVisible(true);
    };

    const submitModalForm = async (values: IChapter) => {
        await updateChapter({
            ...values,
            _id: chapter_id as string,
        });
    };

    const handleDelete = async () => {
        await removeChapter(chapter_id as string);
        triggerModalClose();
    };

    return (
        <Collapse
            accordion
            className="flex flex-col rounded-b-xl w-full"
            activeKey={ chapter_id }
            onChange={ triggerChapterCollapse }
            expandIcon={ ({ isActive }) => (
                <IoIosArrowForward
                    className={ `duration-300 mt-1 rotate-0 text-sm ${
                        chapter_id && isActive && 'rotate-90'
                    }` }
                />
            ) }
        >
            { actualChapters.map((chapter) => (
                <Collapse.Panel
                    key={ chapter._id }
                    className="rounded-none border-0 last:rounded-b-xl"
                    header={ <span>{ chapter.title }</span> }
                    extra={
                        actualUserRole !== 'student' && (
                            <Button
                                className="grid place-items-center border-0 shadow-none"
                                shape="circle"
                                onClick={ (event) =>
                                    triggerChapterEdit(event, chapter._id)
                                }
                                icon={ <BsGearFill /> }
                            />
                        )
                    }
                >
                    <SubdivisionList
                        subdivisions={ actualSubdivisionList || [] }
                    />
                </Collapse.Panel>
            )) }
            { modalVisible && actualUserRole !== 'student' && (
                <CurriculumModal
                    triggerSubdivisionForm={ triggerSubdivisionForm }
                    deleteChapter={ handleDelete }
                    submitChapter={ submitModalForm }
                    onClose={ triggerModalClose }
                    form={ chapterForm }
                    visible={ modalVisible }
                    subdivisions={ actualSubdivisionList || [] }
                />
            ) }
        </Collapse>
    );
};
