export const enum ShadowAction {
    ForceSendGeolocaton = 'ForceSendGeolocaton',
    ForceGetLastUserLocation = 'ForceGetLastUserLocation',
    ForceUpdateUserFriends = 'ForceUpdateUserFriends',
}

export interface IForceGetLastUserLocationPayload {
    userUuid: string;
}

export interface IForceUpdateUserFriendsPayload {
    deletedUserUuid: string;
}

export type ShadowActionPayload = IForceGetLastUserLocationPayload | IForceUpdateUserFriendsPayload | null;

export interface IShadowAction {
    uuid: string;
    type: ShadowAction;
    payload: ShadowActionPayload;
}
