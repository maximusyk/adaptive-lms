import Table from '@componentsLayout/table';
import { useAppSelector } from '@hooks/redux.hook';
import { Button, Drawer, Form, Tabs } from 'antd';
import { useMemo, useState } from 'react';
import './index.scss';
import { useToggle } from '@hooks/toggle.hook';
import { getDashboardMeta } from '@componentsUI/create-form/formFields';
import FormBuilder, { Meta } from 'antd-form-builder';
import { userAPI } from '@services/user.service';
import { courseAPI } from '@services/course.service';
import { classAPI } from '@services/class.service';

const dashboardTabsModels = [
    {
        key: 'users',
        name: 'Users',
    },
    {
        key: 'courses',
        name: 'Courses',
    },
    {
        key: 'classes',
        name: 'Classes',
    },
];

export const DashboardPage = () => {
    const [ dashboardForm ] = Form.useForm();
    const [ dataType, setDataType ] = useState('users');
    const userRole = useAppSelector((state) => state.users.item.role);
    const userId = useAppSelector((state) => state.users.item._id);
    const [ drawerVisibility, toggleDrawerVisibility ] = useToggle(false);
    userAPI.useGetAllUsersQuery();
    courseAPI.useGetAllCoursesQuery();
    classAPI.useGetAllClassesQuery();
    const [ createUser ] = userAPI.useCreateUserMutation();
    const [ createCourse ] = courseAPI.useCreateCourseMutation();
    const [ createClass ] = classAPI.useCreateClassMutation();

    const userList = useAppSelector((state) => state.users.list);
    const courseList = useAppSelector((state) => state.courses.list);
    const classList = useAppSelector((state) => state.classes.list);

    const actualMeta: Meta = useMemo(() => {
        return getDashboardMeta(dataType, { userList, courseList, classList }, userRole === 'admin');
    }, [ dataType ]);

    const handleCreateEntity = async (values: any) => {
        console.log(dataType);
        switch ( dataType ) {
            case 'users':
                await createUser(values);
                break;
            case 'courses':
                if ( userRole === 'admin' ) {
                    await createCourse(values);
                } else {
                    await createCourse({ ...values, instructor: userId });
                }
                break;
            case 'classes':
                await createClass(values);
                break;
            default:
                break;
        }
    };

    return (
        <>
            { !!userRole && (
                <div>
                    { userRole === 'admin' || userRole === 'instructor' ? (
                        <>
                            <Tabs
                                destroyInactiveTabPane={ true }
                                activeKey={ dataType }
                                onTabClick={ (activeKey) => setDataType(activeKey) }
                                className={ 'relative' }
                                tabBarExtraContent={
                                    <Button
                                        key={ 'page-header-left' }
                                        type="ghost"
                                        className="absolute right-0 top-1/3 -translate-y-1/4 flex flex-row items-center rounded border-2 hover:text-violet-600 hover:border-violet-600"
                                        onClick={ toggleDrawerVisibility }
                                    >
                                        { 'Add new' }
                                    </Button> }
                                centered
                            >
                                { dashboardTabsModels.map((tab) => (
                                    <Tabs.TabPane
                                        className="border"
                                        tab={ tab.name }
                                        key={ tab.key }
                                    >
                                        <Table dataType={ tab.key } />
                                    </Tabs.TabPane>
                                )) }
                            </Tabs>
                            <Drawer
                                width={ 500 }
                                title={ `Add new ${ dataType.toUpperCase() }` }
                                // onClose={triggerCreateChapterForm}
                                closable={ false }
                                visible={ drawerVisibility }
                                destroyOnClose={ true }
                            >
                                <Form
                                    //     initialValues={{
                                    //     course: course_id,
                                    //     chapter: chapter_id,
                                    // }}
                                    onValuesChange={ (values) =>
                                        console.log(values?.type || '')
                                    }
                                    form={ dashboardForm }
                                    // form={isChapterForm ? chapterForm : contentForm}
                                    layout="vertical"
                                    onFinish={ handleCreateEntity }
                                    // className='flex flex-col gap-5'
                                >
                                    <FormBuilder form={ dashboardForm } meta={ actualMeta } />
                                    {/*<CurriculumForm*/ }
                                    {/*form={isChapterForm ? chapterForm : contentForm}*/ }
                                    {/*contentType={drawerFormContentType}*/ }
                                    {/*isChapterForm={isChapterForm}*/ }
                                    {/*/>*/ }
                                    <span className="flex flex-row gap-5 justify-end">
                <Button
                    onClick={ toggleDrawerVisibility }
                    type="ghost"
                    className="rounded hover:text-violet-600 hover:border-violet-600"
                >
                Cancel
                </Button>
                <Button
                    htmlType="submit"
                    className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                >
                Submit
                </Button>
                </span>
                                </Form>
                            </Drawer></>
                    ) : (
                        <Table dataType={ 'dashboardForStudents' } />
                    ) }
                </div>
            ) }
        </>);
};
