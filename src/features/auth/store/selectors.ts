import { ApiResponseStatus } from '~/models/apiResponse';
import { IRootState } from '~/store';

export const getLoginRequestStatus = (state: IRootState): ApiResponseStatus => state.auth.loginResponse;
export const getAuthUserEmail = (state: IRootState): string | undefined => state.auth.user?.email;
export const getIsAuthorized = (state: IRootState): boolean => state.auth.isAuthorized;
export const getLoginResponseStartTime = (state: IRootState): Date | undefined => state.auth.loginResponseStartTime;

export const getSubmitLoginRequestStatus = (state: IRootState): ApiResponseStatus => state.auth.submitLoginResponse;

export const getProfileInfoFormValue = (state: IRootState) => state.auth.setProfileInfoFormValue;
export const getAddProfileInfoFormStep = (state: IRootState) => state.auth.profileInfoFormStep;
export const getProfileInfoFormStepResponseStatus = (state: IRootState) => state.auth.setProfileInfoFormStepResponse;
