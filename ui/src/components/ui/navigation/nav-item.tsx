import { Fragment } from 'react';
import { Link } from 'react-router-dom';

interface INavItem {
    title: string;
    icon: string;
    active: boolean;
    data_name: string;
    path: string;
    itemActive: (attr: string | null) => void;
}

const NavItem = ({
    title,
    icon,
    active,
    data_name,
    path,
    itemActive,
}: INavItem) => {
    const cssActive = active ? active : '';
    return (
        <Fragment>
            <Link to={path}>
                <div
                    data-name={data_name}
                    className={'nav-item' + cssActive}
                    onClick={(e) => {
                        itemActive(e.currentTarget.getAttribute('data-name'));
                    }}
                >
                    <div className='nav-item-icon'>
                        <i className={'bx bxs-' + icon} />
                    </div>
                    <span className='nav-item-text'>{title}</span>
                </div>
            </Link>
        </Fragment>
    );
};

export default NavItem;
