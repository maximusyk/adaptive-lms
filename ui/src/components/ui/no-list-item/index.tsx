import { MouseEvent } from 'react';
import { FaPlus } from 'react-icons/all';

interface INoListItem {
    title: string;
    onClick: (event: MouseEvent) => void;
}

export const NoListItem = ({ title, onClick }: INoListItem) => {
    return (
        <div
            className="group cursor-pointer duration-300 m-0 px-3 py-2 flex flex-row rounded-none border border-x-0 border-b-0 h-full w-full hover:text-white hover:bg-violet-400 last:rounded-b-xl"
            onClick={ onClick }
        >
            <span className="flex flex-row items-center w-11/12 gap-2">
                <div className="w-10 min-w-max h-10 avatar placeholder">
                    <div className="w-10 min-w-max h-10 px-2 grid place-content-center bg-violet-400 group-hover:bg-violet-100 text-neutral-content rounded-full">
                        <span className="text-3xl">
                            <FaPlus
                                className="text-white text-2xl group-hover:text-violet-700"
                            />
                        </span>
                    </div>
                </div>
                <span className="text-base font-medium flex-grow-0 truncate">
                    { title }
                </span>
            </span>
        </div>
    );
};
