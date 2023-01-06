export const enum ShadowAction {
    ForceSendGeolocaton = 'ForceSendGeolocaton',
    ForceGetLastUserLocation = 'ForceGetLastUserLocation',
}

export interface IForceGetLastUserLocationPayload {
    userUuid: string;
}

export type ShadowActionPayload = IForceGetLastUserLocationPayload | null;

export interface IShadowAction {
    uuid: string;
    type: ShadowAction;
    payload: ShadowActionPayload;
}
