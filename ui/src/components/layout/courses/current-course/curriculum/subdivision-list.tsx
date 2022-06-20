import { SubdivisionItemType } from '@general-types/chapter.type';
import { useParams } from 'react-router-dom';
import { SubdivisionItem } from './subdivision-item';

interface ISubdivisionList {
    subdivisions: SubdivisionItemType[];
}

export const SubdivisionList = ({ subdivisions }: ISubdivisionList) => {
    const { lecture_id, quiz_id } = useParams();

    if (!subdivisions.length) {
        return (
            <span className='font-medium py-2 pl-2 flex-grow-0 truncate'>
                No Subdivisions yet...
            </span>
        );
    }
    return (
        <>
            {subdivisions.map((subdivision) => (
                <SubdivisionItem
                    key={subdivision.item._id}
                    subdivision={subdivision.item}
                    subdivisionType={subdivision.subdivisionType}
                    isActive={
                        lecture_id === subdivision.item._id ||
                        quiz_id === subdivision.item._id
                    }
                />
            ))}
        </>
    );
};
