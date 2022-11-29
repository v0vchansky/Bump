interface IProfileFriend {
    uuid: string;
    displayName: string;
    friendsAmount: number;
}

export interface IProfileProps {
    displayName: string;
    userName: string;
    friends: IProfileFriend[];
}
