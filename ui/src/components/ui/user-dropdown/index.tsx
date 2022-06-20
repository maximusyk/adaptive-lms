import { unauthorizeUser } from '@features/auth.feature';
import { useAppDispatch, useAppSelector } from '@hooks/redux.hook';
import { authAPI } from '@services/auth.service';
import { Dropdown, Menu, MenuProps, Space } from 'antd';
import { FaCaretDown, MdExitToApp } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import './index.scss';

export const UserDropdown = () => {
    const user = useAppSelector((state) => state.users.item);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [ requestLogout ] = authAPI.useLogoutMutation();

    const handleLogout: MenuProps['onClick'] = (info) => {
        switch ( info.key ) {
            case 'logout':
                requestLogout();
                dispatch(unauthorizeUser());
                navigate('/');
                break;

            default:
                break;
        }
    };

    const menu = (
        <Menu
            items={ [ { key: 'logout', label: 'Logout', icon: <MdExitToApp /> } ] }
            onClick={ handleLogout }
        />
    );

    return (
        <Dropdown
            className="user-dropdown shadow"
            overlay={ menu }
            trigger={ [ 'click' ] }
        >
            <a
                href="/#"
                className="ant-dropdown-link"
                onClick={ (e) => e.preventDefault() }
            >
                <Space>
                    <Avatar
                        size={ 'sm' }
                        name={ user.profile_name || '' }
                        bg={ user.profile_picture }
                    />
                    {/*<Avatar*/ }
                    {/*    initials={getInitials(user?.profile_name || '')}*/ }
                    {/*    color={'violet'}*/ }
                    {/*/>*/ }
                    {/* <Avatar style={{ backgroundColor: user?.profile_picture }}>
                     {getInitials(user?.profile_name)}
                     </Avatar> */ }
                    <span className={ 'flex flex-row gap-1 items-center' }>
                        <span>{ user?.profile_name }</span>
                        <FaCaretDown />
                    </span>
                </Space>
            </a>
        </Dropdown>
    );
};
