import type { ActionType, Reducer } from 'typesafe-actions';
import { getType } from 'typesafe-actions';

import * as actions from './actions';
import { IUserPosition } from './models';

export interface IMapState {
    usersMarkers: IUserPosition[];
}

const initialState: IMapState = {
    usersMarkers: [],
};

export const mapReducer: Reducer<IMapState, ActionType<typeof actions>> = (state = initialState, action) => {
    switch (action.type) {
        case getType(actions.addUserMarker):
            return {
                ...state,
                usersMarkers: [...state.usersMarkers, action.payload],
            };
        case getType(actions.updateUserMarker):
            return {
                ...state,
                usersMarkers: [
                    ...state.usersMarkers.filter(marker => marker.userUuid !== action.payload.userUuid),
                    action.payload,
                ],
            };
        case getType(actions.deleteUserMarker):
            return {
                ...state,
                usersMarkers: state.usersMarkers.filter(marker => marker.userUuid !== action.payload),
            };
        case getType(actions.deselectMarkers):
            return {
                ...state,
                usersMarkers: state.usersMarkers.map(marker => ({ ...marker, selected: false })),
            };
        case getType(actions.selectMarker):
            return {
                ...state,
                usersMarkers: state.usersMarkers.map(marker => ({
                    ...marker,
                    selected: marker.userUuid === action.payload,
                })),
            };
        default:
            return state;
    }
};
