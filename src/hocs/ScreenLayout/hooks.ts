import { IScreenLayoutProps } from './types';

interface IScreenLayoutApiParams extends IScreenLayoutProps {
    classes: string;
}

export const useScreenLayoutApi = ({ classes, bgColor }: IScreenLayoutApiParams) => {
    const className = `${classes || ''} ${bgColor || ''}`;

    return {
        className,
    };
};
