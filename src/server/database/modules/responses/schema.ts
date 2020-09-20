import * as mongoose from 'mongoose';
import Response from '../response/schema';

const Schema = mongoose.Schema;

const schema = new Schema({
    responses: [
        {
            type: {
                type: String,
                default: "text"
            },
            carousel: Object,
            version: {
                type: String,
                default: "text"
            }
        }
    ]
});

export default mongoose.model('responses', schema);