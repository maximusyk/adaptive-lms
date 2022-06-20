interface IAvatar {
    color?: string;
    initials?: string | JSX.Element;
    src?: string;
}

export const Avatar = ({ src, initials, color }: IAvatar) => {
    return (typeof initials === 'string' && initials.length) || initials ? (
        <div
            className={ `inline-flex items-center justify-center p-1 w-8 h-8 text-sm font-medium text-white ${ 'bg-' + color + '-500' } rounded-full` }
        >
            { initials }
        </div>
    ) : (
        <img
            className="inline-block rounded-full ring ring-white w-full h-full"
            src={ src }
        />
    );
};
