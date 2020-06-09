/** @module ModelRating */

const { model, Schema } = require('mongoose');

const RatingSchema = new Schema({
    reference_date: {
        type: Date,
        required: true
    },
    clients: [{
        client_id: String,
        grade_value: Number,
        description: String
    }]
});

module.exports = model('Rating', RatingSchema);
