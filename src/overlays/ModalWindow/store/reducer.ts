import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { ModalWindowName, ModalWindowRef } from './types';

export interface IModalWindowState {
    modals: Record<ModalWindowName, ModalWindowRef>;
}

const initialState: IModalWindowState = {
    modals: {},
};

export const modalWindowReducer: Reducer<IModalWindowState, ActionType<typeof actions>> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case getType(actions.create):
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.payload.name]: action.payload.ref,
                },
            };
        default:
            return state;
    }
};
