import { IRootState } from '..';

export const getIsAppInited = (state: IRootState) => state.app.inited;
