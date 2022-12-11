type Size = 'profile' | 'relations-list';

export interface IProps {
    avatarUrl: string | null;
    displayName: string;
    size: Size;
}
