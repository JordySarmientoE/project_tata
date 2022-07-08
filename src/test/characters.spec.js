const { v4 } = require('uuid')
const service = require('../characters/charactersService')

const data = {
    name_character: "Jordy Sarmiento",
    height: "170",
    mass: "180",
    hair_color: "black",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "10-03-1998",
    gender: "male"
}

let new_character;
let characters = [];

test('Service is an object', () => {
    expect(typeof service).toBe('object')
})

test('Service has functions', () => {
    expect(typeof service.create).toBe('function')
    expect(typeof service.deleteOne).toBe('function')
    expect(typeof service.getAll).toBe('function')
    expect(typeof service.getById).toBe('function')
    expect(typeof service.update).toBe('function')
    expect(typeof service.deleteOne).toBe('function')
})

test('Service create, create a character', async () => {
    expect.assertions(1);
    try {
        const res = await service.create(data);
        new_character = { ...data, id: res.id }
        expect(res).toEqual(new_character)
    }
    catch (error) {
        console.log("Error in create character", error)
    }
})

test('Service getAll return characters', async () => {
    expect.assertions(2);
    try {
        characters = await service.getAll();
        expect(characters[0]).toEqual(new_character)
        expect(characters.length).toEqual(1)
    }
    catch (error) {
        console.log("Error in getAll characters", error)
    }
})

test('Service getById with an valid id, return character', async () => {
    expect.assertions(1);
    try {
        const res = await service.getById(characters[0].id);
        expect(res).toEqual(characters[0])
    }
    catch (error) {
        console.log("Error in get character by id", error)
    }
})

test('Service getById with an not valid id, return undefined', async () => {
    expect.assertions(1);
    try {
        const res = await service.getById("ID_TEST");
        expect(res).toEqual(undefined)
    }
    catch (error) {
        console.log("Error in get character by id", error)
    }
})

test('Service update with an valid id, return new character', async () => {
    expect.assertions(1);
    try {
        const new_body = {
            name_character: "Jordy Sarmiento 2",
            height: "170",
            mass: "180",
            hair_color: "black",
            skin_color: "fair",
            eye_color: "blue",
            birth_year: "10-03-1998",
            gender: "male"
        }
        const res = await service.update(new_character.id, new_body);

        const mockEntries = Object.entries(res)
        const expectedEntries = Object.entries({ ...new_character, ...new_body })
        expect(JSON.stringify(mockEntries)).toEqual(JSON.stringify(expectedEntries))
        new_character = { ...new_character, ...new_body }
    }
    catch (error) {
        console.log("Error in update character", error)
    }
})

test('Service delete, delete character', async () => {
    expect.assertions(1);
    try {
        await service.deleteOne(characters[0].id);
        characters = await service.getAll();
        expect(characters.length).toEqual(0)
    }
    catch (error) {
        console.log("Error in delete character", error)
    }
})