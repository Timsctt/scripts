import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    message: {
        type: {
            author: String,
            content: String,
            receiver: String
        }
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    is_read: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('messages', schema);