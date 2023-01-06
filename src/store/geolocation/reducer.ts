import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import { ApiResponseStatus } from '~/models/apiResponse';

import * as actions from './actions';
import { ISetGeolocationPayload } from './models';
import { SET_GEOLOCATIONS_CHUNK_SIZE } from './saga';

export interface IGeolocationState {
    points: ISetGeolocationPayload[];
    setGeolocationResponse: ApiResponseStatus;
}

const initialState: IGeolocationState = {
    points: [],
    setGeolocationResponse: ApiResponseStatus.NotStarted,
};

export const geolocationReducer: Reducer<IGeolocationState, ActionType<typeof actions>> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case getType(actions.setGeolocationRequest):
            return {
                ...state,
                setGeolocationResponse: ApiResponseStatus.Loading,
            };
        case getType(actions.setGeolocationSuccess):
            return {
                ...state,
                // Реализуем очередь. При успешной отправке чанка кладем в points
                // все точки кроме отправленных
                points: state.points.slice(SET_GEOLOCATIONS_CHUNK_SIZE),
                setGeolocationResponse: ApiResponseStatus.Ok,
            };
        case getType(actions.setGeolocationError):
            return {
                ...state,
                setGeolocationResponse: ApiResponseStatus.Error,
            };
        case getType(actions.addNewGeolocationPoint):
            return {
                ...state,
                points: [...state.points, action.payload],
            };
        default:
            return state;
    }
};
