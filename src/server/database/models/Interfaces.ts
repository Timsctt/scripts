export interface IUser {
    id: string;
    name: string;
}
  
const defaultUser: IUser = {
    id: "anon",
    name: "Anonymous",
};

export interface IMessage {
    user: IUser;
    id: string;
    time: Date;
    value: string;
}
