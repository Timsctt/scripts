import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    type: String,
    carousel: Object,
    version: String,
});

export default mongoose.model('responses', schema);