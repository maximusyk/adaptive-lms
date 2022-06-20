import '@pages/courses/index.scss';
import { Outlet, useParams } from 'react-router-dom';
import { ContentHeader } from '../../../ui/content-header/content-header';

export const CourseContent = () => {
    const { lecture_id, quiz_id } = useParams();
    return (
        <>
            {!(lecture_id || quiz_id) && <ContentHeader />}
            <Outlet />
        </>
    );
};
