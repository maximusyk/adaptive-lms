import { Menu } from 'antd';
import { FaGripfire, FaSitemap } from 'react-icons/all';
import { useLocation, useNavigate } from 'react-router-dom';
import './index.scss';

interface INavList {
    collapsed: boolean;
}

export const NavList = ({ collapsed }: INavList) => {
    const location = useLocation();
    const navigate = useNavigate();
    const activeKey = '/' + location.pathname.split('/')[1];
    const navItems = [
        {
            id: `dashboard_${ Date.now() }`,
            title: 'Dashboard',
            path: '/dashboard',
            icon: <FaSitemap className={ 'text-lg' } />,
        },
        {
            id: `courses_${ Date.now() }`,
            title: 'My Cources',
            path: '/courses',
            icon: <FaGripfire className={ 'text-2xl' } />,
        },
    ];

    return (
        <Menu
            style={ { fontSize: '1rem', background: '#fcfcfc' } }
            className={ `${ !!collapsed && 'w-12' } border-0` }
            mode="inline"
            defaultSelectedKeys={ [ '/' ] }
            selectedKeys={ [ `${ activeKey }` ] }
            items={ navItems.map(({ id, title, path, icon }) => ({
                key: id,
                onClick: () => navigate(path),
                icon,
                label: title,
                className: `${
                    !!collapsed && 'collapsed'
                } pl-4 border-0 after:invisible rounded-lg h-12 ${
                    path === activeKey
                        ? 'text-white bg-violet-700 hover:text-white hover:bg-violet-800'
                        : 'bg-none text-gray-400 hover:text-gray-500'
                }`,
            })) }
        />
    );
};
