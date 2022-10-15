import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export type ModalWindowName = string;
export type ModalWindowRef = React.RefObject<BottomSheetModalMethods>;

export interface IUpdateModalWindowItemPayload {
    name: ModalWindowName;
    ref: ModalWindowRef;
}
