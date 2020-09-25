import { Document } from "mongoose"

export interface IDialog extends Document {
    responses?: [Object];
    message?: Object;
    date: Date;
}