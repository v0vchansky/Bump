import { IShadowAction } from '~/store/shadowActions/models';

import { baseInternalRequest } from './baseInternalRequest';

export const resolveAction = (actionUuid: string) => {
    return baseInternalRequest({
        method: 'POST',
        url: '/shadow_actions/complete_action',
        data: {
            actionUuid,
        },
    }).then(res => res.data);
};

export const getAction = (actionUuid: string) => {
    return baseInternalRequest<IShadowAction>({
        method: 'POST',
        url: '/shadow_actions/get_action',
        data: {
            actionUuid,
        },
    }).then(res => res.data);
};
