import { IUserRelation } from '~/store/user/models';

export interface IProfileProps {
    isLoading: boolean;
    displayName: string;
    userName: string;
    friends: IUserRelation[];
}
