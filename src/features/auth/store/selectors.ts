import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

import { IAutnTokens } from '../models/auth';

export const getLoginRequestStatus = (state: IRootState): ApiResponseStatus => state.auth.loginResponse;
export const getAuthUserPhone = (state: IRootState): string | undefined => state.auth.user?.phone;
export const getAuthTokens = (state: IRootState): IAutnTokens | undefined => state.auth.tokens;
export const getLoginResponseStartTime = (state: IRootState): Date | undefined => state.auth.loginResponseStartTime;
