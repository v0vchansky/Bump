import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

import { IRootState } from '~/store';

import { ModalWindowName } from './types';

export const getModalInstanceSelector = (
    modalName: ModalWindowName,
): ((state: IRootState) => BottomSheetModalMethods | null) => {
    return (state: IRootState) => {
        return state.modalWindow.modals[modalName]?.current;
    };
};
