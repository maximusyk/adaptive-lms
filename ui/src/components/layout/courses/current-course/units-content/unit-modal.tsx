import { Modal } from 'antd';
import { FC } from 'react';

interface IUnitModal {
    isModalVisible: boolean;
    getHtmlOfSelection: () => void;
    toggleModalVisible: () => void;
    lectureText: string;
}

export const UnitModal: FC<IUnitModal> = ({
    isModalVisible,
    getHtmlOfSelection,
    toggleModalVisible,
    lectureText,
}) => {
    return (
        <Modal
            title='Select text for unit content'
            className={'top-6 w-1/2 h-full'}
            visible={isModalVisible}
            onOk={getHtmlOfSelection}
            onCancel={toggleModalVisible}
            destroyOnClose={true}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: lectureText,
                }}
            />
        </Modal>
    );
};
