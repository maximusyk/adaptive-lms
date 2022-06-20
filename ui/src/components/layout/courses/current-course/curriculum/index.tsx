import { IChapterCreate, ISubdivisionCreate } from '@general-types/chapter.type';
import { useAppSelector } from '@hooks/redux.hook';
import { chapterAPI } from '@services/chapter.service';
import { lectureAPI } from '@services/lecture.service';
import { quizAPI } from '@services/quiz.service';
import { Button, Drawer, Form, Layout, List } from 'antd';
import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CurriculumForm, CurriculumHeader, NoListItem } from '../../../../ui';
import { CurriculumList } from './curiculum-list';

const CourseCurriculum: FC = () => {
    const { chapter_id, course_id } = useParams();
    const [ chapterForm ] = Form.useForm<IChapterCreate>();
    const [ subdivisionForm ] = Form.useForm<ISubdivisionCreate>();
    const isStudentProgressQuiz = useAppSelector(
        (state) => state.studentQuiz.status === 'in-progress',
    );
    const [ contentForm ] = Form.useForm();
    const [ drawerFormVisibility, setDrawerFormVisibility ] =
        useState<boolean>(false);
    const [ isFormLoading, setIsFormLoading ] = useState<boolean>(false);
    const [ drawerFormContentType, setDrawerFormContentType ] =
        useState<string>('');
    const [ isChapterForm, setIsChapterForm ] = useState<boolean>(true);

    const isChapters = useAppSelector((state) => !!state.chapters.list.length);
    const actualUserRole = useAppSelector((state) => state.users.item.role);

    const [ handleCreateChapter ] = chapterAPI.useCreateChapterMutation();
    const [ handleCreateLecture ] = lectureAPI.useCreateLectureMutation();
    const [ handleCreateQuiz ] = quizAPI.useCreateQuizMutation();

    const chapterFormHandler = async (values: IChapterCreate) => {
        setIsFormLoading(true);
        await handleCreateChapter({
            ...values,
            course: course_id as string,
        });
        chapterForm.resetFields();
        triggerSubdivisionForm();
        setIsFormLoading(false);
    };
    const contentFormHandler = async (values: ISubdivisionCreate) => {
        setIsFormLoading(true);
        const fd = new FormData();
        Object.entries(values).forEach(([ key, value ]) => {
            fd.append(key, value);
        });
        fd.append('chapter', chapter_id as string);
        fd.append('course', course_id as string);

        if ( values.type === 'Lecture' ) {
            await handleCreateLecture(fd);
        } else {
            await handleCreateQuiz(fd);
        }
        contentForm.resetFields();
        triggerSubdivisionForm();
        setIsFormLoading(false);
    };

    const submitDrawerForm = (values: IChapterCreate | ISubdivisionCreate) => {
        isChapterForm
            ? chapterFormHandler(values as IChapterCreate)
            : contentFormHandler(values as ISubdivisionCreate);
    };

    const triggerCreateChapterForm = () => {
        setDrawerFormVisibility((prev) => {
            if ( prev ) {
                setIsChapterForm(true);
                chapterForm.resetFields();
                subdivisionForm.resetFields();
            }
            return !prev;
        });
    };

    const triggerSubdivisionForm = () => {
        setDrawerFormVisibility((prev) => {
            if ( isChapterForm ) {
                chapterForm.resetFields();
                return !prev;
            }
            subdivisionForm.resetFields();
            return !prev;
        });
        setIsChapterForm(false);
    };

    return (
        <>
            { !isStudentProgressQuiz && (
                <Layout.Sider
                    width="26vw"
                    style={ { backgroundColor: '#f0f2f5' } }
                    theme="light"
                >
                    <List
                        className="rounded-xl"
                        header={
                            <CurriculumHeader
                                visible={ isChapters && actualUserRole !== 'student' }
                                onClick={ triggerCreateChapterForm }
                            />
                        }
                        bordered
                    >
                        { isChapters ? (
                            <CurriculumList
                                triggerSubdivisionForm={ triggerSubdivisionForm }
                            />
                        ) : (
                            <NoListItem
                                title="Add Curriculum Item"
                                onClick={ triggerCreateChapterForm }
                            />
                        ) }
                    </List>
                    { actualUserRole !== 'student' && (
                        <Drawer
                            width={ 500 }
                            title="Add Curriculum Item"
                            onClose={ triggerCreateChapterForm }
                            closable={ false }
                            visible={ drawerFormVisibility }
                            destroyOnClose={ true }
                        >
                            <Form
                                initialValues={ {
                                    course: course_id,
                                    chapter: chapter_id,
                                } }
                                onValuesChange={ (values) =>
                                    setDrawerFormContentType(values?.type || '')
                                }
                                form={ isChapterForm ? chapterForm : contentForm }
                                layout="vertical"
                                onFinish={ submitDrawerForm }
                                // className='flex flex-col gap-5'
                            >
                                <CurriculumForm
                                    form={ isChapterForm ? chapterForm : contentForm }
                                    contentType={ drawerFormContentType }
                                    isChapterForm={ isChapterForm }
                                />
                                <span className="flex flex-row gap-5 justify-end">
                                <Button
                                    onClick={ triggerCreateChapterForm }
                                    type="ghost"
                                    className="rounded hover:text-violet-600 hover:border-violet-600"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    htmlType="submit"
                                    loading={ isFormLoading }
                                    className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                                >
                                    Submit
                                </Button>
                            </span>
                            </Form>
                        </Drawer>
                    ) }
                </Layout.Sider>
            ) }
        </>
    );
};

export default CourseCurriculum;
