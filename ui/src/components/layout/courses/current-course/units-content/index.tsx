import { useAppSelector } from '@hooks/redux.hook';
import { unitAPI } from '@services/unit.service';
import { Button, Empty, PageHeader } from 'antd';
import { FC } from 'react';
import { BiLayerPlus, MdEditNote } from 'react-icons/all';
import { useNavigate, useParams } from 'react-router-dom';
import { UnitList } from './unit-list';

interface IUnitsContent {
    isUnitEditor?: boolean;
}

interface IExtraButtons {
    ghostTitle: string;
    primaryTitle: string;
    ghostClickHandler: () => void;
    triggerUnitEdit: () => void;
    primaryClickHandler: () => void;
    primaryButtonIcon: JSX.Element | false;
    isEditMode: boolean;
}

const ExtraButtons = ({
    ghostTitle,
    primaryTitle,
    ghostClickHandler,
    triggerUnitEdit,
    primaryClickHandler,
    primaryButtonIcon,
    isEditMode,
}: IExtraButtons) => (
    <span className="flex flex-row gap-4" key={ 'header-btns' }>
        <Button
            key={ 'page-header-left' }
            type="ghost"
            className="flex flex-row items-center rounded border-2 hover:text-violet-600 hover:border-violet-600"
            onClick={ ghostClickHandler }
        >
            { ghostTitle }
        </Button>
        { !isEditMode && (
            <>
                <Button
                    key={ 'page-header-middle' }
                    onClick={ triggerUnitEdit }
                    icon={ <MdEditNote size={ '1.2rem' } /> }
                    className="rounded flex flex-row text-violet-600 border-2 border-violet-600 hover:border-transparent hover:text-violet-800 items-center gap-1 hover:bg-violet-400"
                >
                    { 'Edit Units' }
                </Button>
                <Button
                    key={ 'page-header-right' }
                    onClick={ primaryClickHandler }
                    icon={ primaryButtonIcon }
                    className="rounded flex flex-row text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
                >
                    { primaryTitle }
                </Button>
            </>
        ) }
    </span>
);

export const UnitsContent: FC<IUnitsContent> = ({ isUnitEditor = false }) => {
    const { lecture_id } = useParams();
    const navigate = useNavigate();

    const lectureTitle = useAppSelector(
        (state) => state.subdivisions.item.title,
    );
    const { data: units } = unitAPI.useGetUnitsByLectureQuery(
        lecture_id as string,
    );

    const toggleUnitEditMode = () => {
        if ( isUnitEditor ) {
            return navigate(-1);
        }
        navigate('edit');
    };

    const goBack = () => navigate(-1);

    return (
        <>
            <PageHeader
                className="px-5 py-0 w-100"
                onBack={ () => navigate(-1) }
                title={ `Units - "${ lectureTitle }"` }
                extra={ ExtraButtons({
                    ghostTitle: isUnitEditor ? 'Cancel' : 'Back',
                    primaryTitle: 'Add more',
                    ghostClickHandler: isUnitEditor
                        ? toggleUnitEditMode
                        : goBack,
                    primaryClickHandler: toggleUnitEditMode,
                    primaryButtonIcon: !isUnitEditor && (
                        <BiLayerPlus size={ '1.1rem' } />
                    ),
                    triggerUnitEdit: toggleUnitEditMode,
                    isEditMode: isUnitEditor,
                }) }
            />
            <div className="main-content h-full overflow-auto mr-5 mt-6">
                { units?.length ? (
                    <UnitList units={ units } isEditMode={ isUnitEditor } />
                ) : (
                    <Empty
                        description="No available Units for this Lecture"
                        image={ Empty.PRESENTED_IMAGE_SIMPLE }
                    />
                ) }
            </div>
        </>
    );
};
