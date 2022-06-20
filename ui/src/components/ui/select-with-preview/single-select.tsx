import { IUnit } from '@general-types/unit.type';
import { Select, Tooltip } from 'antd';
import { FC } from 'react';

interface ISingleSelect {
    onChange: (value: string) => void;
    options: Pick<IUnit, '_id' | 'title' | 'content'>[];
    currentValue: string;
}

export const SingleSelectPreview: FC<ISingleSelect> = ({
    onChange,
    options,
    currentValue,
}) => {
    return (
        <Select
            className='w-52'
            placeholder='Select unit'
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
