import * as React from 'react';
import ActionSheet from 'react-native-actionsheet';

import { noop } from '~/utils/noop';

export interface IActionSheetVariant {
    title: string;
    onClick: VoidFunction;
}

export interface IShowActionSheetParams {
    title: string;
    message?: string;
    variants: IActionSheetVariant[];
}

interface IState {
    title: string;
    message?: string;
    options: IActionSheetVariant[];
}

interface IActionSheetContextValue {
    showActionSheet: (params: IShowActionSheetParams) => void;
}

const ActionSheetContext = React.createContext<IActionSheetContextValue>({
    showActionSheet: noop,
});

export const useActionSheet = () => React.useContext(ActionSheetContext);

export const ActionSheetManager: React.FC<{ children?: JSX.Element }> = ({ children }) => {
    const actionSheet = React.useRef<ActionSheet | null>(null);

    const [state, setState] = React.useState<IState | null>(null);

    const onPress = React.useCallback(
        (index: number) => {
            if (state) {
                state.options[index]?.onClick();
            }
        },
        [state],
    );

    const contextValue = React.useMemo(() => {
        return {
            showActionSheet: ({ title, message, variants }: IShowActionSheetParams) => {
                setState({
                    title,
                    message,
                    options: variants,
                });
            },
        };
    }, []);

    React.useEffect(() => {
        if (state !== null) {
            actionSheet.current?.show();
        }
    }, [state]);

    return (
        <ActionSheetContext.Provider value={contextValue}>
            {children}
            {state ? (
                <ActionSheet
                    ref={o => (actionSheet.current = o)}
                    title={state.title}
                    message={state.message}
                    cancelButtonIndex={state.options.length}
                    options={[...state.options.map(option => option.title), 'Отменить']}
                    onPress={onPress}
                />
            ) : null}
        </ActionSheetContext.Provider>
    );
};
