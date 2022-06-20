import { Button } from 'antd';
import { MouseEvent } from 'react';

interface ICurriculumHeader {
    visible: boolean;
    onClick: (event: MouseEvent) => void;
}

export const CurriculumHeader = ({ visible, onClick }: ICurriculumHeader) => (
    <div className={'w-100 flex flex-row justify-between'}>
        <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Course Curriculum
        </span>
        {visible && (
            <Button
                onClick={onClick}
                className='flex flex-row text-white hover:text-white items-center gap-1 border-0 bg-violet-600 hover:bg-violet-800'
            >
                Add new
            </Button>
        )}
    </div>
);
