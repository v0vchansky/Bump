import { baseInternalRequest } from '../../../api/internal/baseInternalRequest';
import { IAuthLoginResponse, ISetProfileInfoPayload, ISubmitLoginParams, ISubmitLoginResponse } from '../models/auth';

export const login = (email: string) => {
    return baseInternalRequest<IAuthLoginResponse>({
        method: 'POST',
        url: '/auth/login',
        data: {
            email,
        },
    }).then(res => res.data);
};

export const submitLogin = ({ email, code }: ISubmitLoginParams) => {
    return baseInternalRequest<ISubmitLoginResponse>({
        method: 'POST',
        url: '/auth/submit_login',
        data: {
            email,
            code,
        },
    }).then(res => res.data);
};

export const setProfileInfo = (params: ISetProfileInfoPayload) => {
    return baseInternalRequest<ISubmitLoginResponse>({
        method: 'POST',
        url: '/user/set_profile_info',
        data: params,
    }).then(res => res.data);
};
