'use strict';

const { responseNotFound, responseGetById, responseError, responseCreate, responseDelete, responseUpdate, responseGetAll } = require('../shared/response');
const Table = require('../shared/tables');
const service = require('./charactersService')

class CharactersController {
    async getAll() {
        try {
            let characters = [];
            await Promise.allSettled([
                service.getAll(),
                service.getStarWarsCharacters()
            ]).then(responses => {
                const responses_mapped = responses.filter(m => m.status === 'fulfilled').map(m => m.value)
                responses_mapped.forEach(m => {
                    const new_characters = [].concat.apply([], m)
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
            const newCharacter = await service.getById(id)

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
            const characterFound = await service.getById(id)

            if (!characterFound) {
                return responseNotFound(Table.Character)
            }

            const newCharacter = Object.assign({ ...characterFound }, { ...body })
            Object.keys(newCharacter).forEach(key => { if (!Object.keys(characterFound).includes(key)) { delete newCharacter[key] } })

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
            const newCharacter = await service.getById(id)

            if (!newCharacter) {
                return responseNotFound(Table.Character)
            }

            await service.deleteOne(id)

            return responseDelete(Table.Character)
        }
        catch (error) {
            return responseError()
        }
    }
}

module.exports = new CharactersController();