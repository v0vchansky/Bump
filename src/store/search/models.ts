import { IFullUser, IUserRelation, RelationList } from '../user/models';

export interface IProfilesStackItem {
    user: IFullUser;
    relations: IUserRelation[];
}

export interface IUpdateRelationsPayload {
    uuid: string;
    type: RelationList;
}
