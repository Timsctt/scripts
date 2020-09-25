import * as mongoose from 'mongoose';
import { IDialog } from './model';

const Schema = mongoose.Schema;

const schema = new Schema({
    owner: String,
    responses: [
        Object
    ],
    message: Object,
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IDialog>('dialog', schema);