import { useAppSelector } from '@hooks/redux.hook';
import { Notifications } from '../../ui/notifications';
import { UserDropdown } from '../../ui/user-dropdown';
import './index.scss';

const Header = () => {
    const user = useAppSelector((state) => state.users.item);

    const isStudentProgressQuiz = useAppSelector(
        (state) => state.studentQuiz.status === 'in-progress',
    );

    const currentRole = (value: string) => {
        switch ( value ) {
            case 'admin':
                return 'Admin';
            case 'instructor':
                return 'Instructor';
            case 'student':
                return 'Student';
            default:
                return 'User';
        }
    };

    return (
        <>
            {
                !isStudentProgressQuiz && (
                    <header className="header">
                        <span>{ currentRole(user?.role || '') }</span>
                        <div className="flex flex-row items-center">
                            { !!user && <Notifications /> }
                            <UserDropdown />
                        </div>
                    </header>
                )
            }
        </>
    );
};

export default Header;
