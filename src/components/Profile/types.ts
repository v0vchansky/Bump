import { RelationList } from '~/store/user/models';

export interface IProfileProps {
    uuid: string;
    displayName: string;
    userName: string;

    relationType: RelationList | undefined;
}
