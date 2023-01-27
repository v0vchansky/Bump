import * as React from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface IAppStateManager {
    onForeground?: VoidFunction;
    onBackground?: VoidFunction;
    onChange?: (step: AppStateStatus) => void;
}

// export const useAppStateManager = (options: IAppStateManager) => {
//     // const appStateSubscription = React.useRef<NativeEventSubscription | null>(null);
//     // const appState = React.useRef(AppState.currentState);
//     // React.useEffect(() => {
//     //     appStateSubscription.current?.remove();
//     //     appState.current = AppState.currentState;
//     //     appStateSubscription.current = AppState.addEventListener('change', nextAppState => {
//     //         if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//     //             options.onSwitchToActive?.();
//     //         } else if (nextAppState.match(/inactive|background/)) {
//     //             options.onSwitchToBackground?.();
//     //         }
//     //         appState.current = nextAppState;
//     //     });
//     // }, [options.onSwitchToActive, options.onSwitchToBackground]);
//     // React.useEffect(() => {
//     //     return () => {
//     //         appStateSubscription.current?.remove();
//     //     };
//     // }, []);
// };

export const useAppStateManager = (settings: IAppStateManager) => {
    const { onChange, onForeground, onBackground } = settings || {};
    const [appState, setAppState] = React.useState<AppStateStatus>(AppState.currentState);

    React.useEffect(() => {
        const appStateSubscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active' && appState !== 'active') {
                onForeground?.();
            } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
                onBackground?.();
            }

            setAppState(nextAppState);
            onChange?.(nextAppState);
        });

        return () => appStateSubscription.remove();
    }, [onChange, onForeground, onBackground, appState]);

    return { appState };
};
