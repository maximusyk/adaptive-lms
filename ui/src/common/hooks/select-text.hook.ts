import { useCallback, useState } from 'react';

export const useSelectedText = (): [string, () => void] => {
    const [state, setState] = useState('');

    const select = useCallback(() => {
        const selected = window.getSelection() as Selection;
        setState(selected.toString());
    }, []);
    return [state, select];
};
