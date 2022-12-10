import { IUserRelation } from '~/store/user/models';

import { baseInternalRequest } from './baseInternalRequest';

export const searchByUsername = (username: string) => {
    return baseInternalRequest<IUserRelation[]>({
        method: 'POST',
        url: '/user/search_by_username',
        data: {
            username,
        },
    }).then(res => res.data);
};
