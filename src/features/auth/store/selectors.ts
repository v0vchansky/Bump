import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

export const getLoginRequestStatus = (state: IRootState): ApiResponseStatus => state.auth.loginResponse;
export const getAuthUserPhone = (state: IRootState): string | undefined => state.auth.user?.phone;
export const getIsAuthorized = (state: IRootState): boolean => state.auth.isAuthorized;
export const getLoginResponseStartTime = (state: IRootState): Date | undefined => state.auth.loginResponseStartTime;
