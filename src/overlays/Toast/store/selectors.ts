import { IRootState } from '~/store';

export const getToast = (state: IRootState) => state.toast.toast;
