import { IUser, IUserRelation, RelationList, RelationRequestType } from '~/store/user/models';

import { baseInternalRequest } from './baseInternalRequest';

export const getUser = () => {
    return baseInternalRequest<IUser>({
        method: 'POST',
        url: '/user/get_user',
        data: {},
    }).then(res => res.data);
};

export const getUserRelationsByType = (type: RelationList, uuid?: string) => {
    return baseInternalRequest<IUserRelation[]>({
        method: 'POST',
        url: '/user/get_relations_by_type',
        data: {
            type,
            uuid,
        },
    }).then(res => res.data);
};

export const sendRelationRequest = (to: string, relationRequestType: RelationRequestType) => {
    return baseInternalRequest<IUserRelation | undefined>({
        method: 'POST',
        url: '/user/send_relation_request',
        data: {
            to,
            relationType: relationRequestType,
        },
    }).then(res => res.data);
};
