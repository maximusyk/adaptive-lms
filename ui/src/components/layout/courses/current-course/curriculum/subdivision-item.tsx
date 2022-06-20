import { setActualSubdivision } from '@features/subdivisions.feature';
import { ILecture } from '@general-types/lecture.type';
import { IQuiz } from '@general-types/quiz.type';
import { useAppDispatch } from '@hooks/redux.hook';
import { Avatar } from 'antd';
import { FC, useEffect } from 'react';
import { MdChecklist, RiArticleLine } from 'react-icons/all';
import { Link, useLocation, useParams, useResolvedPath } from 'react-router-dom';

interface ISubdivisionItem {
    isActive: boolean;
    subdivisionType: string;
    subdivision: ILecture | IQuiz;
}

export const SubdivisionItem: FC<ISubdivisionItem> = ({
    isActive,
    subdivision,
    subdivisionType,
}) => {
    const { chapter_id } = useParams();
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    const pathToNavigate = useResolvedPath(
        `chapters/${ chapter_id }/${ subdivisionType }/${ subdivision._id }`,
    ).pathname;

    const handleActualSubdivision = () => {
        dispatch(setActualSubdivision(subdivision));
    };

    useEffect(() => {
        if ( pathname.includes(pathToNavigate) ) {
            handleActualSubdivision();
        }
    }, [ pathname, pathToNavigate ]);

    return (
        <Link
            className={ `group flex flex-row py-2 pl-2 rounded-xl items-center w-full  ${
                isActive
                    ? 'text-white bg-violet-700'
                    : 'hover:text-white hover:bg-violet-500'
            }` }
            to={ pathToNavigate }
        >
            <span className="flex flex-row items-center w-11/12 gap-2">
                <Avatar
                    className={ `w-10 min-w-max h-10 px-2 flex flex-row items-center place-content-center ${
                        isActive
                            ? 'text-white bg-violet-100'
                            : 'bg-violet-100 group-hover:bg-violet-100'
                    }` }
                    icon={
                        subdivisionType === 'lectures' ? (
                            <RiArticleLine
                                className={ `text-2xl ${
                                    isActive
                                        ? 'text-violet-700'
                                        : 'text-violet-500 group-hover:text-violet-600'
                                }` }
                            />
                        ) : (
                            <MdChecklist
                                className="text-2xl text-violet-600 group-hover:text-violet-300 font-bold"
                            />
                        )
                    }
                />
                <span className="flex-grow-0 truncate">
                    { subdivision.title }
                </span>
            </span>
        </Link>
    );
};
