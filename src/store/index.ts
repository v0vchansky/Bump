import { IAuthState } from '~/features/auth/store/reducer';
import { IModalWindowState } from '~/overlays/ModalWindow/store/reducer';

import { IRouterState } from './router/reducer';
import { ITestState } from './test/reducer';

export interface IRootState {
    test: ITestState;
    router: IRouterState;
    modalWindow: IModalWindowState;
    auth: IAuthState;
}
