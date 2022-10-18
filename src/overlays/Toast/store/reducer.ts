import Toast from 'react-native-toast-notifications';
import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';

export interface IToastState {
    toast: Toast | null;
}

const initialState: IToastState = {
    toast: null,
};

export const toastReducer: Reducer<IToastState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.create):
            return {
                ...state,
                toast: action.payload,
            };
        default:
            return state;
    }
};
