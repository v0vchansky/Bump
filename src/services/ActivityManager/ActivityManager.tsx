import * as React from 'react';
import { AppState } from 'react-native';

interface IProps {
    children: React.ReactElement;
}

export const ActivityManagerContext = React.createContext<boolean | null>(null);

export const ActivityManager: React.FC<IProps> = props => {
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (nextAppState === 'active') {
                setIsActive(true);
            } else if (nextAppState === 'background' || nextAppState === 'inactive') {
                setIsActive(false);
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return <ActivityManagerContext.Provider value={isActive}>{props.children}</ActivityManagerContext.Provider>;
};
