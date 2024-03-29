import { IAuthState } from '~/features/auth/store/reducer';
import { IModalWindowState } from '~/overlays/ModalWindow/store/reducer';

import { IAppState } from './app/reducer';
import { IGeolocationState } from './geolocation/reducer';
import { IMapState } from './map/reducer';
import { IRouterState } from './router/reducer';
import { ISearchState } from './search/reducer';
import { IUserState } from './user/reducer';

export interface IRootState {
    router: IRouterState;
    modalWindow: IModalWindowState;
    auth: IAuthState;
    geolocation: IGeolocationState;
    user: IUserState;
    search: ISearchState;
    app: IAppState;
    map: IMapState;
}
