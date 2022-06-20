import { useAppSelector } from '@hooks/redux.hook';
import { Badge, Layout, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/all';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AppLogo } from '../../ui/app-logo';
import { NavList } from '../../ui/navigation';
import './index.scss';

const { Sider } = Layout;

const Navbar = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const [ badgeVisibile, setBadgeVisibile ] = useState(true);
    const { pathname } = useLocation();
    const { chapter_id } = useParams();
    const isStudentProgressQuiz = useAppSelector(
        (state) => state.studentQuiz.status === 'in-progress',
    );

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if ( chapter_id ) setCollapsed(true);
    }, [ chapter_id ]);

    useEffect(() => {
        const valueToSet = pathname.includes('courses') && pathname.length > 8;
        setCollapsed(valueToSet);
        setBadgeVisibile(!valueToSet);
    }, [ pathname ]);

    const updateDimensions = () => {
        const width = window.innerWidth;
        const valueToSet =
            width <= 1600 ||
            (pathname.includes('courses') && pathname.length > 8);
        setCollapsed(valueToSet);
        setBadgeVisibile(!valueToSet);
    };

    return (
        <>
            {
                !isStudentProgressQuiz && (
                    <Badge
                        style={ {
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                            width: '25px',
                            height: '25px',
                            padding: '4px',
                            borderRadius: '50%',
                            color: '#633dcd',
                            visibility: badgeVisibile ? 'visible' : 'hidden',
                        } }
                        className="collapse-trigger"
                        count={
                            <span className="trigger" onClick={ toggleCollapse }>
                        { collapsed ? <FaChevronRight /> : <FaChevronLeft /> }
                    </span>
                        }
                        offset={ [ 0, 40 ] }
                    >
                        <Sider
                            className="sidebar"
                            width="15vw"
                            theme="light"
                            trigger={ null }
                            collapsible
                            collapsed={ collapsed }
                        >
                            <Link to="/">
                                <AppLogo collapsed={ collapsed } />
                            </Link>
                            <NavList collapsed={ collapsed } />
                            <Tooltip
                                title="Use our App"
                                placement="right"
                                trigger={ collapsed ? 'hover' : '' }
                            >
                                <button
                                    className={
                                        'learn-more' + (collapsed ? ' collapsed' : '')
                                    }
                                    style={ { width: collapsed ? 'auto' : '12rem' } }
                                >
                            <span className="circle" aria-hidden="true">
                                <span className="icon arrow" />
                            </span>
                                    { collapsed ? (
                                        ''
                                    ) : (
                                        <span className="button-text">Use our App</span>
                                    ) }
                                </button>
                            </Tooltip>
                        </Sider>
                    </Badge>
                ) }
        </>
    );
};

export default Navbar;
