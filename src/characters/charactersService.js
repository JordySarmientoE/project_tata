'use strict';

const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const TableName = require("../shared/tableNames");
const { default: axios } = require("axios");
const externalApis = require("../shared/externalApis");

class CharactersService {
    options = {}

    constructor(){
        if(process.env.JEST_WORKER_ID){
            this.options = {
                endpoint: 'http://localhost:8000',
                region: 'local-env',
                sslEnabled: false,
            };
        }
    }

    async getAll() {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient(this.options);

            const result = await dynamodb.scan({
                TableName: TableName.Characters
            }).promise();

            return result.Items
        }
        catch (error) {
            throw error;
        }
    }

    async getStarWarsCharacters(page){
        try{
            const res = await axios.get(`${externalApis.STAR_WARS}/people`)
            return res.data.results
        }
        catch(error){
            throw error;
        }
    }

    async create(payload) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient(this.options);

            const { name_character, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = payload;
            const id = v4()

            const newCharacter = {
                id,
                name_character,
                height,
                mass,
                hair_color,
                skin_color,
                eye_color,
                birth_year,
                gender
            }

            await dynamodb.put({
                TableName: TableName.Characters,
                Item: newCharacter
            }).promise();

            return newCharacter
        }
        catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient(this.options);

            const result = await dynamodb.get({
                TableName: TableName.Characters,
                Key: {
                    id
                }
            }).promise();

            return result.Item
        }
        catch (error) {
            throw error;
        }
    }

    async update(id, payload) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient(this.options);
            const { name_character, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = payload;
            const res = await dynamodb.update({
                TableName: TableName.Characters,
                Key: {
                    id
                },
                UpdateExpression: 'set name_character = :name_character, height = :height, mass = :mass, hair_color = :hair_color, skin_color = :skin_color, eye_color = :eye_color, birth_year = :birth_year, gender = :gender',
                ExpressionAttributeValues: {
                    ':name_character': name_character,
                    ':height': height,
                    ':mass': mass,
                    ':hair_color': hair_color,
                    ':skin_color': skin_color,
                    ':eye_color': eye_color,
                    ':birth_year': birth_year,
                    ':gender': gender
                }
            }).promise();
            return {...payload, id};
        }
        catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient(this.options);
            await dynamodb.delete({
                TableName: TableName.Characters,
                Key: {
                    id
                }
            }).promise();
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new CharactersService();