import { IRouterState } from './router/reducer';
import { ITestState } from './test/reducer';

export interface IRootState {
    test: ITestState;
    router: IRouterState;
}
