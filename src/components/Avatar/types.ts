type Size = 'profile' | 'relations-list' | 'map';

export interface IProps {
    avatarUrl: string | null;
    displayName: string;
    size: Size;
}
