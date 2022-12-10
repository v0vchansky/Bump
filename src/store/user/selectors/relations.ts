import { createSelector } from 'reselect';

import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';
import { IProfilesStackItem } from '~/store/search/models';
import { getProfilesStack } from '~/store/search/selectors';

import { IUser, IUserRelation, RelationList } from '../models';

import { getMe, getMyRelations } from './me';

export const getIsLoadingChangeRelationWithUsers = (uuid: string) => {
    return (state: IRootState) =>
        state.user.changeRelationResponse === ApiResponseStatus.Loading && state.user.changeRelationState === uuid;
};

export const getProfileRelationType = createSelector(
    getMe,
    getMyRelations,
    getProfilesStack,
    (me: IUser, relations: IUserRelation[], stack: IProfilesStackItem[]) => {
        const lastStackItem: IProfilesStackItem | undefined = stack[stack.length - 1];

        if (!lastStackItem) {
            return undefined;
        }

        if (lastStackItem.user.uuid === me.uuid) {
            return RelationList.You;
        }

        const relation = relations.find(relation => relation.user.uuid === lastStackItem.user.uuid);

        return relation?.type || RelationList.Nobody;
    },
);
