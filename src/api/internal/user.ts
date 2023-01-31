import { Image } from 'react-native-image-crop-picker';

import { IFullUser, IUser, IUserRelation, RelationList, RelationRequestType } from '~/store/user/models';

import { baseInternalRequest } from './baseInternalRequest';

export const getUser = () => {
    return baseInternalRequest<IUser | IFullUser>({
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

export const uploadAvatar = (file: Image) => {
    const formData = new FormData();

    formData.append('image', {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        uri: file.path,
        type: 'image/jpeg',
        name: file.path,
    });

    return baseInternalRequest<string>({
        method: 'POST',
        url: '/user/upload_avatar',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    }).then(res => res.data);
};

export const deleteAvatar = () => {
    return baseInternalRequest({
        method: 'POST',
        url: '/user/delete_avatar',
        data: {},
    });
};

export const updateDeviceToken = (fcmToken: string) => {
    return baseInternalRequest({
        method: 'POST',
        url: '/user/update_device_token',
        data: {
            fcmToken,
        },
    });
};
