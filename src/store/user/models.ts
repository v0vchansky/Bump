export interface IUser {
    uuid: string;
    phone: string;
    birthday: Date | null;
    userName: string | null;
    displayName: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export const enum RelationList {
    OutgoingFriendRequest = 'OutgoingFriendRequest',
    IncomingFriendRequest = 'IncomingFriendRequest',
    Friendship = 'Friendship',
    Nobody = 'Nobody',
    You = 'You',
    MutualFriendship = 'MutualFriendship', // мета-тип, нет на бэке и в бд
}

export const enum RelationRequestType {
    SendRequestToFriends = 'SendRequestToFriends',
    RejectFriendRequest = 'RejectFriendRequest',
    ResolveFriendRequest = 'ResolveFriendRequest',
    CancelFriendRequest = 'CancelFriendRequest',
    RemoveFromFriends = 'RemoveFromFriends',
}

export type IFullUser = IUser & {
    birthday: Date;
    userName: string;
    displayName: string;
    userRelations: IUserRelations[];
};

export interface IUserRelation {
    type: RelationList;
    user: IFullUser;
}

export interface IUserRelations {
    uuid: string;
    userUuid: string;
    targetUserUuid: string;
    type: RelationList;
}

export type IUserProfileInfo = Pick<IUser, 'birthday' | 'displayName' | 'userName'>;

export interface ISetUserProfileInfoPayload {
    fieldName: keyof IUserProfileInfo;
    value: string | Date;
}

export interface IChangeRelationWithUserPayload {
    uuid: string;
    type: RelationRequestType;
    fromSearch?: boolean;
}
