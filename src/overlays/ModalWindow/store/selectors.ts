import { IRootState } from '~/store';

import { ModalWindowName, ModalWindowRef } from './types';

export const getModalInstanceSelector = (modalName: ModalWindowName): ((state: IRootState) => ModalWindowRef) => {
    return (state: IRootState) => {
        return state.modalWindow.modals[modalName];
    };
};
