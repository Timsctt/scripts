import { ModificationNote } from "../common/model";

export interface IMessage {
    _id?: String;
    message: {
        author: String;
        query: String;
        receiver: String;
    };
    datetime: Date;
    is_deleted?: Boolean;
    is_read?: Boolean;
    modification_notes: ModificationNote[]
}