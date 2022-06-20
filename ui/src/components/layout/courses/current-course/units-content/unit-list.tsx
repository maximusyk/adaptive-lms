import { IUnit } from '@general-types/unit.type';
import { Collapse } from 'antd';
import { FC } from 'react';
import { UnitItem } from './unit-item';

interface IUnitList {
    units: Pick<
        IUnit,
        '_id' | 'title' | 'content' | 'keywords' | 'cohesionRate'
    >[];
    isEditMode: boolean;
}

export const UnitList: FC<IUnitList> = ({ units, isEditMode }) => {
    return (
        <Collapse
            className={'main-content'}
            // onChange={collapseChangeHandler}
            accordion
            ghost
            destroyInactivePanel={true}
        >
            {units.map((unit) => (
                <Collapse.Panel
                    key={unit._id}
                    header={<span>{unit.title}</span>}
                >
                    <UnitItem
                        key={unit._id}
                        _id={unit._id}
                        title={unit.title}
                        content={unit.content}
                        keywords={unit.keywords}
                        cohesionRate={unit.cohesionRate}
                        isEditMode={isEditMode}
                    />
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};
