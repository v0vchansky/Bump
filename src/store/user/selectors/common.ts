import { IRootState } from '../..';
import { IUser } from '../models';

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
