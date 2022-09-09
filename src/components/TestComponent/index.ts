import { withPlatform } from '../../utils/withPlatform';

import { TestComponent as Android } from './TestComponent.android';
import { TestComponent as Ios } from './TestComponent.ios';

export const TestComponent = withPlatform(Ios, Android);
