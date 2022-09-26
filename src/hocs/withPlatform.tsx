import type { ComponentType, PropsWithChildren, PropsWithoutRef, RefAttributes } from 'react';
import * as React from 'react';
import { Platform as SystemPlatform } from 'react-native';

import { Platform } from '../models/platform';

export const withPlatform = <PROPS, REF>(
    IosComponent: ComponentType<PROPS>,
    AndroidComponent: ComponentType<PROPS>,
): ComponentType<PropsWithoutRef<PropsWithChildren<PROPS>> & RefAttributes<REF>> => {
    const WrappedComponent = React.forwardRef<REF, PROPS>((props, ref) => {
        const platform = SystemPlatform.OS;

        const Component = platform === Platform.Ios ? IosComponent : AndroidComponent;

        return <Component {...props} ref={ref} />;
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const component = IosComponent || AndroidComponent;
    const componentName = component.displayName || component.name || 'Component';

    WrappedComponent.displayName = `PlatformComponent(${componentName})`;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return WrappedComponent;
};
