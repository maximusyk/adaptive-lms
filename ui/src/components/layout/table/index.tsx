import { IClass } from '@general-types/class.type';
import { ICourse } from '@general-types/course.type';
import { IUser } from '@general-types/user.type';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { classAPI } from '@services/class.service';
import { courseAPI } from '@services/course.service';
import { userAPI } from '@services/user.service';
import { Layout, Table as TableUI } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import ActionButtons from './action-buttons';
import columns from './columns';
import './index.scss';
import { IQuiz } from '@general-types/quiz.type';

const { Content } = Layout;

interface ITable {
    dataType: string;
}

const Table = ({ dataType }: ITable) => {
    const [ tableData, setTableData ] = useState<readonly (IUser | ICourse | IClass)[]>([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const dispatch = useAppDispatch();
    const userRole = useAppSelector((state) => state.users.item.role);
    const userId = useAppSelector((state) => state.users.item._id);
    const globalLoadingState = useAppSelector(
        (state) => state.globalLoaderState.status,
    );

    const createHandler = async (values: IUser | ICourse | IClass) => {
        // const newData: any = await crudFunctions.createData(dataType, values);
        // setTableData(newData);
    };

    const updateHandler = async () => {
        // setIsLoaded(false);
        // const newData = await crudFunctions.updateData(dataType, id);
        // setTableData(newData);
        // setIsLoaded(true);
    };

    const [ fetchUsers ] = userAPI.useLazyGetAllUsersQuery();
    const [ fetchCourses ] = courseAPI.useLazyGetAllCoursesQuery();
    const [ fetchClasses ] = classAPI.useLazyGetAllClassesQuery();

    const handleData = useCallback(
        async (tableName: string) => {
            switch ( tableName ) {
                case 'users':
                    setTableData((await fetchUsers()).data as IUser[]);
                    break;
                case 'classes':
                    setTableData((await fetchClasses()).data as IClass[]);
                    break;

                case 'courses':
                    setTableData((await fetchCourses()).data as ICourse[]);
                    break;
                case 'dashboardForStudents':
                    setTableData((await fetchCourses()).data?.map((course) => {
                        const secondLevel = course.chapters.map((chapter) => {
                            return chapter.subdivisions.map((subdivision) => {
                                if ( subdivision.subdivisionType === 'quizzes' ) {
                                    const quizItem = subdivision.item as IQuiz;
                                    const quizScore = quizItem.results?.find((usersScore) => usersScore.user === userId)?.score || 'None';
                                    return { title: quizItem.title, score: quizScore };
                                }
                            }).filter(Boolean);
                        });
                        return {
                            ...course,
                            secondLevel: secondLevel.map((item) => Array.isArray(item) ? item[0] : item),
                        };
                    }) as ICourse[]);
                    break;

            }
            // const newData = await crudFunctions.retrieveData(tableName);
            // setTableData(newData);
        },
        [ dataType ],
    );

    useEffect(() => {
        setIsLoaded(!globalLoadingState);
    }, [ globalLoadingState ]);

    useEffect(() => {
        handleData(dataType);
    }, [ dataType ]);

    const deleteHandler = async (id: string) => {
        // const newData = await crudFunctions.deleteData(dataType, id);
        // setTableData(newData);
    };

    const nestedTable = (record: { secondLevel: readonly any[] | undefined; }, index: any, indent: any, expanded: any) => {
        console.log('Columns');
        console.table(columns.nestedDashboardForStudents);
        console.log('Data');
        console.log(record.secondLevel);
        return (
            <TableUI
                columns={ columns.nestedDashboardForStudents }
                dataSource={ record.secondLevel }
                pagination={ false }
            />
        );
    };

    return (
        <TableUI
            rowKey="_id"
            bordered
            size="small"
            loading={ !isLoaded }
            pagination={ false }
            // @ts-ignore
            dataSource={ tableData }
            { ...(dataType === 'dashboardForStudents' ? { expandedRowRender: nestedTable } : {}) }
        >
            { columns[dataType].map((column: any) => (
                <TableUI.Column
                    title={ column.title }
                    dataIndex={ column.dataIndex }
                    key={ column.id }
                    render={ column.render }

                    // sorter={column.sorter}
                />
            )) }
            { userRole === 'admin' && (
                <TableUI.Column
                    title="Action"
                    width={ 100 }
                    key="action"
                    fixed="right"
                    className="text-right"
                    render={ (record) => (
                        <ActionButtons
                            id={ record._id }
                            handleDelete={ deleteHandler }
                            handleUpdate={ updateHandler }
                        />
                    ) }
                />
            ) }
        </TableUI>
    );
};
export default Table;
