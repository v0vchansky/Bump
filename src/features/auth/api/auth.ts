import { baseInternalRequest } from '../../../api/internal/baseInternalRequest';
import { IAuthLoginResponse, ISubmitLoginParams, ISubmitLoginResponse } from '../models/auth';

export const login = (phone: string) => {
    return baseInternalRequest<IAuthLoginResponse>({
        method: 'POST',
        url: '/auth/login',
        data: {
            phone,
        },
    });
};

export const submitLogin = ({ phone, code }: ISubmitLoginParams) => {
    return baseInternalRequest<ISubmitLoginResponse>({
        method: 'POST',
        url: '/auth/submit_login',
        data: {
            phone,
            code,
        },
    });
};
