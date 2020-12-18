const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const stateDataSchema = new Schema({
    "stateName": {
        type: String,
        required: true,
        unique: true
    },
    "district": {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('stateData', stateDataSchema)