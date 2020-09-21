import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { IDialog } from './model';

const Schema = mongoose.Schema;

const schema = new Schema({
    owner: String,
    dialogId: ObjectId,
    date: Date
});

export default mongoose.model<IDialog>('dialog', schema);