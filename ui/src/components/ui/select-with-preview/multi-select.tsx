import { IUnit } from '@general-types/unit.type';
import { Select, Tooltip } from 'antd';
import { FC } from 'react';

interface IMultiSelect {
    onChange: (value: string[]) => void;
    options: Pick<IUnit, '_id' | 'title' | 'content'>[];
    currentValue: string[];
}

export const MultiSelectPreview: FC<IMultiSelect> = ({
    onChange,
    options,
    currentValue,
}) => {
    return (
        <Select
            mode='tags'
            maxTagCount={'responsive'}
            className='w-52'
            placeholder='Select or type unit'
            onChange={onChange}
            value={currentValue}
        >
            {options.map((valueOption) => (
                <Select.Option
                    value={valueOption._id || ''}
                    key={valueOption._id}
                >
                    <Tooltip
                        placement='right'
                        title={
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: valueOption.content || '',
                                }}
                            />
                        }
                    >
                        <span className='w-full'>{valueOption.title}</span>
                    </Tooltip>
                </Select.Option>
            ))}
        </Select>
    );
};
