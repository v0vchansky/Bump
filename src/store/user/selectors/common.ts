import { ApiResponseStatus } from '~/models/apiResponse';

import { IRootState } from '../..';
import { IFullUser, IUser, RelationList } from '../models';

export const getShouldAddProfileInfo = (state: IRootState): boolean => {
    if (state.user.user) {
        const { birthday, userName, displayName } = state.user.user;

        return !birthday || !userName || !displayName;
    }

    return false;
};

export const getEmptyUserProfileInfoFields = (
    state: IRootState,
): Pick<IUser, 'displayName' | 'userName' | 'birthday'> => ({
    displayName: state.user.user?.displayName || null,
    userName: state.user.user?.userName || null,
    birthday: state.user.user?.birthday || null,
});

export const getProfileInfo = (state: IRootState): Pick<IUser, 'displayName' | 'userName'> | null => {
    if (!state.user.user) {
        return null;
    }

    return {
        displayName: state.user.user?.displayName,
        userName: state.user.user?.userName,
    };
};

export const getFullUser = (state: IRootState): IFullUser | undefined => {
    const user = state.user.user;

    if (user?.birthday && user?.displayName && user?.userName) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return user as IFullUser;
    }

    return undefined;
};

export const getFullUserFriendByUuid = (friendUuid: string | undefined) => {
    return (state: IRootState): IFullUser | undefined => {
        if (!friendUuid) {
            return;
        }

        const user = state.user.relations.find(
            relation => relation.type === RelationList.Friendship && relation.user.uuid === friendUuid,
        )?.user;

        if (user?.birthday && user?.displayName && user?.userName) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            return user as IFullUser;
        }

        return;
    };
};

export const getIsAvatarLoading = (state: IRootState) => state.user.avatarResponse === ApiResponseStatus.Loading;
