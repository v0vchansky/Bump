import { useSelector } from 'react-redux';

import { getModalInstanceSelector } from './store/selectors';

export const useModalWindow = (modalName: string) => {
    const modal = useSelector(getModalInstanceSelector(modalName));

    return modal;
};
