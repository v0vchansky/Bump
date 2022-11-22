export interface IUser {
    uuid: string;
    phone: string;
    birthday: Date | null;
    userName: string | null;
    displayName: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type IUserProfileInfo = Pick<IUser, 'birthday' | 'displayName' | 'userName'>;

export interface ISetUserProfileInfoPayload {
    fieldName: keyof IUserProfileInfo;
    value: string | Date;
}
