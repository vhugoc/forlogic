/** @module ClientController */

const Client = require('../models/Client');
const { cnpj: cnpj_lib } = require('cpf-cnpj-validator');
const moment = require('moment');

class ClientController {

    /**
     * Get clients
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async index(request, response) {
        try {
            const { name } = request.query;

            if (!name) {
                const clients = await Client.find();
                return response.status(200).json(clients);
            }

            const client = await Client.findOne({ name });
            return response.status(200).json(client);

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Get client by id
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async show(request, response) {
        try {
            const { id } = request.params;
            const client = await Client.findOne({ _id: id });
            return response.status(200).json(client);
        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Add a client
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async create(request, response) {
        try {
            const { name, contact_name, cnpj, since_date } = request.body;

            if (!name || !contact_name )
                return response.status(400).json({ success: false, message: "Empty data" });

            if (since_date) {
                if (!moment(since_date).isValid() || moment(since_date).isAfter(moment()))
                    return response.status(400).json({ success: false, message: "Invalid date" });
            }

            if (cnpj) {

                if (!cnpj_lib.isValid(cnpj))
                    return response.status(400).json({ success: false, message: "Invalid cnpj" });

                var client_by_cnpj = await Client.findOne({
                    cnpj: { $eq: cnpj }
                });
            }

            const client_by_name = await Client.findOne({ name });

            if (client_by_name || client_by_cnpj)
                return response.status(400).json({ success: false, message: "Client already exists" });

            const create = await Client.create({
                name,
                contact_name,
                cnpj,
                since_date
            });

            if (!create)
                return response.status(500).json({ success: false, message: "Internal error" });

            return response.status(200).json({ success: true, message: "Client successfully created", create });

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Update a client
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async update(request, response) {
        try {
            const { name, contact_name, cnpj, since_date } = request.body;
            const { id } = request.params;

            if (!name || !contact_name )
                return response.status(400).json({ success: false, message: "Empty data" });

            if (since_date) {
                if (!moment(since_date).isValid() || moment(since_date).isAfter(moment()))
                    return response.status(400).json({ success: false, message: "Invalid date" });
            }

            if (cnpj) {

                if (!cnpj_lib.isValid(cnpj))
                    return response.status(400).json({ success: false, message: "Invalid cnpj" });

                var client_by_cnpj = await Client.findOne({
                    $and: [
                        { cnpj: { $eq: cnpj } },
                        { _id: { $ne: id } },
                    ]
                });
            }

            const exists = await Client.findOne({ _id: id });
        
            if (!exists)
                return response.status(400).json({ success: false, message: "Client does not exists" });

            const client_by_name = await Client.findOne({
                $and: [
                    { name: { $eq: name } },
                    { _id: { $ne: id } },
                ]
            });

            if (client_by_name || client_by_cnpj)
                return response.status(400).json({ success: false, message: "Client already exists" });

            const update = await Client.updateOne({ _id: id }, {
                name,
                contact_name,
                cnpj,
                since_date
            });

            if (!update)
                return response.status(500).json({ success: false, message: "Internal error" });

            return response.status(200).json({ success: true, message: "Client successfully updated", update });

        } catch(err) {
            console.log(err);
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }

    /**
     * Delete a client
     * @param {*} request 
     * @param {*} response 
     * @return {json}
     */
    async remove(request, response) {
        try {
            const { id } = request.params;

            const exists = await Client.findOne({ _id: id });

            if (!exists)
                return response.status(400).json({ success: false, message: "Client does not exists" });

            const del = await Client.deleteOne({ _id: id });

            if (!del)
                return response.status(500).json({ success: false, message: "Internal error" });

            return response.status(200).json({ success: true, message: "Client successfully deleted" });

        } catch(err) {
            return response.status(500).json({ success: false, message: "Internal error" });
        }
    }
}

module.exports = ClientController;
