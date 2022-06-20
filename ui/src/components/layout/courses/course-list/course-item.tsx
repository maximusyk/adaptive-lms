import { ICourse } from '@general-types/course.type';
import { getInitials } from '@utils/get-initials.utils';
import { List } from 'antd';
import { MdImageSearch } from 'react-icons/all';
import { Link } from 'react-router-dom';
import { Avatar } from '../../../ui/user-dropdown/avatar';

interface ICourseItem {
    course: ICourse;
}

const CourseItem = ({ course }: ICourseItem) => {
    return (
        <List.Item>
            <Link to={ `${ course._id }` }>
                <div className="w-full max-w-sm overflow-hidden rounded-xl border bg-white shadow-md">
                    <div className="relative">
                        <div
                            className={ `h-48 bg-cover bg-no-repeat bg-center grid place-items-center ${
                                true && 'bg-gray-300'
                            }` }
                        >
                            {/* {true ? ( */ }
                            <MdImageSearch className="text-5xl text-gray-700" />
                            {/* ) : (
                             <img
                             className='bg-cover bg-no-repeat bg-center'
                             src='https://picsum.photos/245/245'
                             />
                             )} */ }
                        </div>
                        {/* <div
                         style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                         className='absolute bottom-0 mb-2 ml-3 px-2 py-1 rounded text-sm text-white'
                         >
                         {`${chaptersCount} chapters`}
                         </div> */ }
                        <div
                            style={ { bottom: '-20px' } }
                            className="absolute right-0 w-10 mr-2"
                        >
                            <Avatar
                                color="blue"
                                initials={ getInitials(
                                    course?.instructor?.profile_name || '',
                                ) }
                                key={ course.instructor?._id }
                            />
                        </div>
                    </div>
                    <div className="p-3">
                        <h3 className="mr-10 text-lg truncate">
                            { course.title }
                        </h3>
                    </div>
                </div>
                {/* <Card
                 className='card'
                 hoverable
                 title={
                 <Space
                 className='card-header'
                 style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 }}
                 >
                 <Tag
                 color={`${
                 progress === 100 ? 'success' : 'warning'
                 }`}
                 >
                 {progress === 100 ? 'Finished' : 'On going'}
                 </Tag>
                 <Progress
                 width={35}
                 type='circle'
                 percent={
                 ['admin', 'instructor'].includes(
                 actualUser?.role as string,
                 )
                 ? 100
                 : actualUser?.progress?.find(
                 (p) => p.course._id === course_id,
                 )?.value || 0
                 }
                 />
                 </Space>
                 }
                 >
                 <Space direction='vertical' className='card-body'>
                 <h5 className='card-title'>{course_title}</h5>

                 <div className='course-users'>
                 <div className='instructor d-flex align-items-center'>
                 <Avatar
                 size='small'
                 className='instructor-avatar user-avatar'
                 style={{
                 background: instructor?.profile_picture
                 ? instructor.profile_picture
                 : '',
                 }}
                 >
                 {!instructor ? (
                 <AiOutlineUserDelete
                 size={'1.7rem'}
                 stroke='1rem'
                 />
                 ) : (
                 getInitials(
                 instructor.profile_name as string,
                 )
                 )}
                 </Avatar>
                 <span className='instructor-name text-secondary'>
                 {instructor?.profile_name}
                 </span>
                 </div>
                 <div className='student-avatars'>
                 <Avatar.Group maxCount={3}>
                 {users?.length &&
                 users?.map((user, idx) => {
                 return (
                 <Tooltip
                 key={idx}
                 title={user.profile_name}
                 >
                 <Avatar
                 style={{
                 background:
                 user.profile_picture,
                 }}
                 >
                 {user.profile_name &&
                 getInitials(
                 user.profile_name,
                 )}
                 </Avatar>
                 </Tooltip>
                 );
                 })}
                 </Avatar.Group>
                 </div>
                 </div>
                 </Space>
                 </Card> */ }
            </Link>
        </List.Item>
    );
};

export default CourseItem;
