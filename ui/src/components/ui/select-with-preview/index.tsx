import { IUnit } from '@general-types/unit.type';
import { FC } from 'react';
import { MultiSelectPreview } from './multi-select';
import { SingleSelectPreview } from './single-select';

interface ISelectPreview {
    onChange: (value: string | string[]) => void;
    options: Pick<IUnit, '_id' | 'title' | 'content'>[];
    currentValue: string | string[];
    mode: 'single' | 'multi';
}

export const SelectPreview: FC<ISelectPreview> = ({
    onChange,
    options,
    currentValue,
    mode,
}) => {
    const selectType = {
        single: SingleSelectPreview,
        multi: MultiSelectPreview,
    };

    const SelectComponent = selectType[mode];

    return (
        <SelectComponent
            onChange={onChange}
            currentValue={currentValue as string & string[]}
            options={options}
        />
    );
};
