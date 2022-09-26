import { baseInternalRequest } from '../../../api/internal/baseInternalRequest';
import { IAuthLogin } from '../models/auth';

export const login = () => {
    return baseInternalRequest<IAuthLogin>({
        method: 'POST',
        url: '/auth/login',
        data: {
            phone: '79269495364',
        },
    });
};
