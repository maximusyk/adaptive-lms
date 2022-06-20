import { IChapter, SubdivisionItemType } from '@general-types/chapter.type';
import { Badge, Button, Form, FormInstance, List, Modal, Popconfirm } from 'antd';
import { CurriculumForm } from '../curriculum-form';
import { useAppSelector } from '@hooks/redux.hook';

interface ICurriculumModal {
    visible: boolean;
    onClose: () => void;
    submitChapter: (values: IChapter) => void;
    deleteChapter: () => void;

    triggerSubdivisionForm(): void;

    form: FormInstance;
    subdivisions: SubdivisionItemType[];
}

export const CurriculumModal = ({
    visible,
    form,
    onClose,
    submitChapter,
    deleteChapter,
    triggerSubdivisionForm,
    subdivisions,
}: ICurriculumModal) => {
    const handleOkModal = () => {
        form.submit();
        onClose();
    };
    const actualChapter = useAppSelector((state) => state.chapters.item);

    return (
        <Modal
            title={ `Edit - ${ actualChapter.title }` }
            visible={ visible }
            destroyOnClose={ true }
            zIndex={ 300 }
            footer={ [
                <span
                    className="flex flex-row justify-between"
                    key={ 'modal-footer-btns' }
                >
                    <span className="flex flex-row">
                        <Popconfirm
                            title="Are you sure to delete this chapter?"
                            onConfirm={ deleteChapter }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                key="delete"
                                className="font-medium hover:font-bold flex flex-row rounded text-red-600 border-2 border-red-600 hover:border-transparent hover:text-red-800 items-center gap-1 hover:bg-red-400"
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button
                            key="add-subdivision"
                            onClick={ triggerSubdivisionForm }
                            className="font-medium hover:font-bold flex flex-row rounded text-emerald-600 border-2 border-emerald-600 hover:border-transparent hover:text-emerald-800 items-center gap-1 hover:bg-emerald-400"
                        >
                            Add Subdivision
                        </Button>
                    </span>
                    <span className="flex flex-row">
                        <Button
                            key="back"
                            onClick={ onClose }
                            className="font-medium hover:font-bold flex flex-row rounded hover:text-violet-600 hover:border-violet-600"
                        >
                            Cancel
                        </Button>
                        <Button
                            key="submit"
                            onClick={ handleOkModal }
                            className="font-medium hover:font-bold flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                        >
                            Submit
                        </Button>
                    </span>
                </span>,
            ] }
        >
            <Form
                form={ form }
                initialValues={ actualChapter }
                onFinish={ (values) =>
                    values.title !== actualChapter.title && submitChapter(values)
                }
                layout="horizontal"
            >
                <CurriculumForm form={ form } isChapterForm={ true } />
                <List
                    header={
                        <span className="font-medium underline tracking-wide">
                            Subdivisions
                        </span>
                    }
                    itemLayout="horizontal"
                    dataSource={ subdivisions }
                    renderItem={ (subdivision) => (
                        <Badge.Ribbon
                            color={
                                subdivision.subdivisionType === 'lectures'
                                    ? 'green'
                                    : 'volcano'
                            }
                            text={
                                <span className="capitalize">
                                    { subdivision.subdivisionType === 'lectures'
                                        ? 'Lecture'
                                        : 'Quiz' }
                                </span>
                            }
                        >
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <span className="font-medium text-sm">
                                            { subdivision.item.title }
                                        </span>
                                    }
                                />
                            </List.Item>
                        </Badge.Ribbon>
                    ) }
                />
            </Form>
        </Modal>
    );
};
