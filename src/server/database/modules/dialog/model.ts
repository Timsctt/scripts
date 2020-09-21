import { ObjectId } from "mongodb";
import { Document } from "mongoose";

export interface IDialog extends Document {
    owner: String;
    dialogId: ObjectId;
    date: Date;
}