import { BsTrashFill, FiEdit } from 'react-icons/all';
import { Space, Tooltip } from 'antd';

interface IActionButtons {
    id: string;
    handleDelete: (id: string) => void;
    handleUpdate: (id: string) => void;
}

const ActionButtons = ({ id, handleDelete, handleUpdate }: IActionButtons) => {
    return (
        <Space className="h-full">
            <Tooltip title="Update">
                <FiEdit
                    className="h-full"
                    style={ { fontSize: '1.3rem', color: 'coral' } }
                    role="button"
                    onClick={ () => handleUpdate(id) }
                />
            </Tooltip>
            <Tooltip title="Delete">
                <BsTrashFill
                    className="h-full"
                    style={ { fontSize: '1.3rem', color: 'red' } }
                    role="button"
                    onClick={ () => handleDelete(id) }
                />
            </Tooltip>
        </Space>
    );
};

export default ActionButtons;
