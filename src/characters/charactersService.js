'use strict';

const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const TableName = require("../shared/tableNames");

class CharactersService {
    async getAll() {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();

            const result = await dynamodb.scan({
                TableName: TableName.Characters
            }).promise();

            return result.Items
        }
        catch (error) {
            throw error;
        }
    }

    async create(payload) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();

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
            const dynamodb = new AWS.DynamoDB.DocumentClient();

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
            const dynamodb = new AWS.DynamoDB.DocumentClient();
            const { name_character, height, mass, hair_color, skin_color, eye_color, birth_year, gender } = payload;
            await dynamodb.update({
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
        }
        catch (error) {
            throw error;
        }
    }

    async deleteOne(id) {
        try {
            const dynamodb = new AWS.DynamoDB.DocumentClient();
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