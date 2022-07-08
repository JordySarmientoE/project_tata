'use strict';

const { responseNotFound, responseGetById, responseError, responseCreate, responseDelete, responseUpdate, responseGetAll } = require('../shared/response');
const Table = require('../shared/tables');
const service = require('./charactersService')

class CharactersController {
    async getAll() {
        try {
            let characters = [];
            // Get data saved from database and star wars API on same promise
            await Promise.allSettled([
                service.getAll(),
                service.getStarWarsCharacters()
            ]).then(responses => {
                // Filter only correct responses
                const responses_mapped = responses.filter(m => m.status === 'fulfilled').map(m => m.value)
                // Map character to response
                responses_mapped.forEach(m => {
                    // Create an array with characters values
                    const new_characters = [].concat.apply([], m)
                    // Concat characters with new characters from response
                    characters = characters.concat(new_characters)
                })
            })
            return responseGetAll(Table.Character, characters)
        }
        catch (error) {
            return responseError()
        }
    }

    async create(event) {
        try {
            const body = event.body
            // Craete character with service
            const newCharacter = await service.create(body)

            return responseCreate(Table.Character, newCharacter)
        }
        catch (error) {
            return responseError()
        }
    }

    async getById(event) {
        try {
            const { id } = event.pathParameters;
            // Get by id character with service
            const newCharacter = await service.getById(id)
            // Validate if character exists
            if (!newCharacter) {
                return responseNotFound(Table.Character)
            }

            return responseGetById(Table.Character, newCharacter)
        }
        catch (error) {
            return responseError()
        }
    }

    async update(event) {
        try {
            const { id } = event.pathParameters;
            const body = event.body
            // Get by id character with service
            const characterFound = await service.getById(id)
            // Validate if character exists
            if (!characterFound) {
                return responseNotFound(Table.Character)
            }
            // Create new character values with old data and new data from payload
            const newCharacter = Object.assign({ ...characterFound }, { ...body })
            // Delete some values not permited to register from payload
            Object.keys(newCharacter).forEach(key => { if (!Object.keys(characterFound).includes(key)) { delete newCharacter[key] } })
            // Delete when we know character exists
            await service.update(id, newCharacter)

            return responseUpdate(Table.Character, newCharacter)
        }
        catch (error) {
            return responseError()
        }
    }

    async deleteOne(event) {
        try {
            const { id } = event.pathParameters;
            // Get by id character with service
            const newCharacter = await service.getById(id)
            // Validate if character exists
            if (!newCharacter) {
                return responseNotFound(Table.Character)
            }
            // Delete when we know character exists
            await service.deleteOne(id)

            return responseDelete(Table.Character)
        }
        catch (error) {
            return responseError()
        }
    }
}

module.exports = new CharactersController();