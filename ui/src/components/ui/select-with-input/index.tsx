import { IUnit } from '@general-types/unit.type';
import { InputNumber } from 'antd';
import { FC, useState } from 'react';
import { SelectPreview } from '../select-with-preview';

export type SelectValue = {
    unit: Pick<IUnit, '_id' | 'title' | 'content'>;
    rate: number;
};

interface ISelectWithInput {
    rateOptions: SelectValue[];
    onChange: (value: SelectValue) => void;
}

export const SelectWithInput: FC<ISelectWithInput> = ({
    rateOptions,
    onChange,
}) => {
    const [ actualInputValue, setActualInputValue ] = useState(0);
    const [ actualSelectValue, setActualSelectValue ] = useState('');
    const selectValues = rateOptions.map(({ unit }) => unit) || [];

    const selectChangeHandler = (value: string) => {
        setActualInputValue(
            () =>
                rateOptions.find((option) => option.unit._id === value)?.rate ||
                0,
        );
        setActualSelectValue(value);
    };

    const inputChangeHandler = (value: number) => {
        const selectItem = selectValues.find(
            (option) => option._id === actualSelectValue,
        );
        setActualInputValue(value || 0);
        if ( selectItem ) {
            onChange({ unit: selectItem, rate: value || 0 });
        }
    };

    return (
        <InputNumber
            addonBefore={
                <SelectPreview
                    onChange={
                        selectChangeHandler as (
                            value: string | string[],
                        ) => void
                    }
                    options={ selectValues }
                    currentValue={
                        actualSelectValue || rateOptions[0]?.unit?._id || ''
                    }
                    mode="single"
                />
            }
            min={ 0 }
            max={ 10 }
            keyboard={ true }
            onChange={ inputChangeHandler }
            value={ actualInputValue }
        />
    );
};
