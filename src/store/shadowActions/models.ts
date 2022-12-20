export const enum ShadowAction {
    ForcePushGeolocation = 'ForcePushGeolocation',
}

export interface IShadowAction {
    uuid: string;
    type: ShadowAction;
}
