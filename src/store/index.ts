import { IAuthState } from '~/features/auth/store/reducer';
import { IModalWindowState } from '~/overlays/ModalWindow/store/reducer';

import { IGeolocationState } from './geolocation/reducer';
import { IRouterState } from './router/reducer';

export interface IRootState {
    router: IRouterState;
    modalWindow: IModalWindowState;
    auth: IAuthState;
    geolocation: IGeolocationState;
}
