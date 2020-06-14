/** @module RatingController */

const Rating = require('../models/Rating');
const Client = require('../models/Client');
const moment = require('moment');

class RatingController {

    /**
     * Get ratings
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async index(request, response) {
        try {
            const ratings = await Rating.find();
            return response.status(200).json(ratings);
        } catch(err) {
            console.log(err);
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }
    
    /**
     * Show rating by id
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async show(request, response) {
        try {
            const { id } = request.params;
            const rating = await Rating.findOne({ _id: id });
            return response.status(200).json(rating);
        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Add a rating
     * @param {*} request
     * @param {*} response
     * @return {json}
     */
    async create(request, response) {
        try {
            const { reference_date, clients } = request.body;

            if (!reference_date || !clients || !clients.length)
                return response.status(400).json({ success: false, message: "Empty data" });

            if (!moment(reference_date).isValid() || moment(reference_date).isAfter(moment()))
                return response.status(400).json({ success: false, message: "Invalid date" });

            const exists = await Rating.findOne({ reference_date });
            if (exists)
                return response.status(400).json({ success: false, message: "A rating for this month already exists" });

            const create = await Rating.create({
                reference_date,
                clients
            });

            if (!create)
                return response.status(500).json({ success: false, message: "Internal error" });

            return response.status(200).json({ success: true, message: "Rating successfully created", create });

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Delete a rating
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async remove(request, response) {
        try {
            const { id } = request.params;

            const exists = await Rating.findOne({ _id: id });

            if (!exists)
                return response.status(400).json({ success: false, message: "Rating does not exists" });

            const del = await Rating.deleteOne({ _id: id });

            if (!del)
                return response.status(500).json({ success: false, message: "Internal error" });

            return response.status(200).json({ success: true, message: "Rating successfully deleted" });

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }
}

module.exports = RatingController;
