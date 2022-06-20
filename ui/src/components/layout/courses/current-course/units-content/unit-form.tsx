import { IUnit } from '@general-types/unit.type';
import { useAppSelector } from '@hooks/redux.hook';
import { useSelectedText } from '@hooks/select-text.hook';
import { useToggle } from '@hooks/toggle.hook';
import { keywordAPI } from '@services/keyword.service';
import { lectureAPI } from '@services/lecture.service';
import { unitAPI } from '@services/unit.service';
import { Button, Form, Input, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { SelectValue, SelectWithInput } from '../../../../ui/select-with-input';
import { UnitModal } from './unit-modal';

interface IUnitForm {
    initialValues: Pick<IUnit,
        '_id' | 'title' | 'content' | 'keywords' | 'cohesionRate'>;
}

export const UnitForm: FC<IUnitForm> = ({ initialValues }) => {
    const [ unitForm ] = Form.useForm();
    const [ lectureText, setLectureText ] = useState('');
    const [ rateOptions, setRateOptions ] = useState<SelectValue[]>([]);

    const [ isModalVisible, toggleModalVisible ] = useToggle();
    const [ selectedContent, selectTextHandler ] = useSelectedText();

    const actualLectureFileId = useAppSelector((state) => {
        if ( 'fileId' in state.subdivisions.item ) {
            return state.subdivisions.item.fileId;
        }
    });

    const actualUnits = useAppSelector((state) => state.units.list)
    ?.map(({ _id, title, content }) =>
        _id !== initialValues?._id
            ? {
                _id,
                title,
                content,
            }
            : null,
    )
    .filter(Boolean);

    const { error, isLoading } = lectureAPI.useReadLectureQuery(
        actualLectureFileId as string,
    );
    const [ updateUnit ] = unitAPI.useUpdateUnitMutation();

    useEffect(() => {
        if ( actualUnits?.length ) {
            setRateOptions((unit) => {
                return actualUnits.map((unit) => {
                    const rate =
                        initialValues.cohesionRate?.find(
                            (item) => item?.unit === unit?._id,
                        )?.rate || 0;
                    const newUnit = unit as Pick<IUnit,
                        '_id' | 'title' | 'content'>;
                    return { unit: newUnit, rate };
                });
            });
        }
    }, []);

    useEffect(() => {
        if ( error && !isLoading && 'data' in error )
            setLectureText(error?.data as string);
    }, [ error, isLoading ]);

    const { data: actualKeywords } = keywordAPI.useGetAllKeywordsQuery();

    const handleUpdate = async (values: IUnit) => {
        const cohesionRate = rateOptions
        .filter(({ rate }) => rate > 0)
        .map(({ unit, rate }) => ({ unit: unit?._id, rate }));
        updateUnit({ ...values, cohesionRate, _id: initialValues._id });
    };

    const cohesionRateChangeHandler = (value: SelectValue) => {
        setRateOptions((prev) => {
            return prev.map(({ unit, rate }) => {
                const newRate =
                    value?.unit?._id === unit?._id ? value.rate : rate;
                return { unit, rate: newRate };
            });
        });
    };

    return (
        <Form
            form={ unitForm }
            layout="vertical"
            className="flex flex-col items-end"
            onFinish={ handleUpdate }
            initialValues={ initialValues }
        >
            <div className="flex flex-row gap-3 w-full">
                <div className="flex flex-col w-2/3 items-start gap-0">
                    <Form.Item
                        name="title"
                        className="w-full"
                        label="Unit Title"
                    >
                        <Input className={ 'rounded' } placeholder="Title" />
                    </Form.Item>
                    <Form.Item
                        name="keywords"
                        className={ 'w-full' }
                        label="Keywords"
                    >
                        <Select
                            mode="tags"
                            maxTagCount={ 'responsive' }
                            placeholder="Select or type new one"
                            tokenSeparators={ [ ',', ';' ] }
                        >
                            { actualKeywords?.map((keyword) => (
                                <Select.Option
                                    value={ keyword.title }
                                    key={ keyword._id }
                                >
                                    { keyword.title }
                                </Select.Option>
                            )) }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="cohesionRate"
                        className={ 'w-full' }
                        label="Cohesion Rate"
                    >
                        <SelectWithInput
                            onChange={ cohesionRateChangeHandler }
                            rateOptions={ rateOptions }
                        />
                    </Form.Item>
                </div>
                <Form.Item name="content" className={ 'w-full' } label="Content">
                    <Input.TextArea
                        autoSize={ {
                            minRows: 9,
                            maxRows: 9,
                        } }
                        className={ 'w-full' }
                        onClick={ toggleModalVisible }
                    />
                </Form.Item>
            </div>
            <Button
                htmlType="submit"
                className="flex flex-row rounded text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800"
            >
                Submit
            </Button>
            <UnitModal
                toggleModalVisible={ toggleModalVisible }
                isModalVisible={ isModalVisible }
                getHtmlOfSelection={ selectTextHandler }
                lectureText={ lectureText || '' }
            />
        </Form>
    );
};
