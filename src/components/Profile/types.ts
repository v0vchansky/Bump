import { RelationList } from '~/store/user/models';

export interface IProfileProps {
    uuid: string;
    displayName: string;
    userName: string;
    avatarUrl: string | null;

    relationType: RelationList | undefined;
}
