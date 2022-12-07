import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

export const getIsLoadingChangeRelationWithUsers = (uuid: string) => {
    return (state: IRootState) =>
        state.user.changeRelationResponse === ApiResponseStatus.Loading && state.user.changeRelationState === uuid;
};
