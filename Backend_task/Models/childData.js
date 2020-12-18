const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const childDataSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "sex": {
        type: String,
        required: true
    },
    "fatherName": {
        type: String,
        required: true
    },
    "motherName": {
        type: String,
        required: true
    },
    "dob": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "districtName": {
        type: String,
        required: true
    },
    "stateName": {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('childData', childDataSchema)