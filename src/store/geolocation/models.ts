export interface IGeolocation {
    uuid: string;
    lat: number;
    lon: number;
    speed: number;
    localTime: Date;
    batteryLevel: number;
    batteryIsCharging: boolean;

    createdAt: Date;
    updatedAt: Date;

    userUuid: string;
}

export interface ISetGeolocationPayload {
    lat: number;
    lon: number;
    speed: number;
    localTime: Date;
    batteryLevel: number;
    batteryIsCharging: boolean;
}
