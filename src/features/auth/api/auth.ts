import { baseInternalRequest } from '../../../api/internal/baseInternalRequest';
import { IAuthLoginResponse, ISetProfileInfoPayload, ISubmitLoginParams, ISubmitLoginResponse } from '../models/auth';

export const login = (phone: string) => {
    return baseInternalRequest<IAuthLoginResponse>({
        method: 'POST',
        url: '/auth/login',
        data: {
            phone,
        },
    }).then(res => res.data);
};

export const submitLogin = ({ phone, code }: ISubmitLoginParams) => {
    return baseInternalRequest<ISubmitLoginResponse>({
        method: 'POST',
        url: '/auth/submit_login',
        data: {
            phone,
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
