const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 4
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            min: 4
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        organization: {
            type: String,
            required: true,
            min: 2
        },
        designation: {
            type: String,
            required: true,
            min: 2
        },
    },
    { versionKey: false }
);

module.exports = mongoose.model('UserData', UserSchema);
