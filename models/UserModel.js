const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDetailSchema = new Schema({
    Image: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = UserDetail = mongoose.model('user_detail', UserDetailSchema);
