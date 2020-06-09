/** @module ModelClient */

const { model, Schema } = require('mongoose');

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact_name: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: false,
        default: null
    },
    since_date: {
        type: Date,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

module.exports = model('Client', ClientSchema);
