import * as React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { closeByName, create } from './store/actions';
import { styles } from './styles';
import { IModalWindowProps } from './types';

export const ModalWindow: React.FC<IModalWindowProps> = ({ name, children, innerProps, bottomSheetProps }) => {
    const dispatch = useDispatch();

    const ref = React.useRef<BottomSheetModal>(null);

    React.useEffect(() => {
        dispatch(create({ name, ref }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderDefaultBackdrop = React.useCallback(
        () => <View style={styles.transparentBackdrop} onTouchStart={() => dispatch(closeByName(name))} />,
        [dispatch, name],
    );

    return (
        <BottomSheetModal
            ref={ref}
            style={styles.layout}
            backdropComponent={innerProps?.withDefaultBackdrop ? renderDefaultBackdrop : undefined}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...bottomSheetProps}
        >
            {children}
        </BottomSheetModal>
    );
};
