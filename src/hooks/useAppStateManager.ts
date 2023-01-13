import * as React from 'react';
import { AppState, NativeEventSubscription } from 'react-native';

interface IAppStateManager {
    onSwitchToActive?: VoidFunction;
    onSwitchToBackground?: VoidFunction;
}

export const useAppStateManager = (options: IAppStateManager) => {
    // const appStateSubscription = React.useRef<NativeEventSubscription | null>(null);
    // const appState = React.useRef(AppState.currentState);
    // React.useEffect(() => {
    //     appStateSubscription.current?.remove();
    //     appState.current = AppState.currentState;
    //     appStateSubscription.current = AppState.addEventListener('change', nextAppState => {
    //         if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
    //             options.onSwitchToActive?.();
    //         } else if (nextAppState.match(/inactive|background/)) {
    //             options.onSwitchToBackground?.();
    //         }
    //         appState.current = nextAppState;
    //     });
    // }, [options.onSwitchToActive, options.onSwitchToBackground]);
    // React.useEffect(() => {
    //     return () => {
    //         appStateSubscription.current?.remove();
    //     };
    // }, []);
};
