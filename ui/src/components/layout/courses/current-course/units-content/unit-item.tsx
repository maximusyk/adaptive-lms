import { IKeyword } from '@general-types/keyword.type';
import { UnitCohesionRate } from '@general-types/unit.type';
import { FC } from 'react';
import { UnitForm } from './unit-form';

interface IUnitItem {
    _id: string;
    title: string;
    content: string;
    keywords: IKeyword[];
    cohesionRate: UnitCohesionRate[];
    isEditMode: boolean;
}

export const UnitItem: FC<IUnitItem> = ({
    _id,
    title,
    content,
    keywords,
    cohesionRate,
    isEditMode,
}) => {
    if (isEditMode) {
        const initialValues = {
            _id,
            title,
            content,
            keywords,
            cohesionRate,
        };
        return <UnitForm initialValues={initialValues} />;
    }
    return (
        <p>
            {content?.replace('(?<=src="data:image/png;base64)(.*?)(?=")', '')}
        </p>
    );
};
