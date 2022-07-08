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
    // Validate has an expect true
    expect.assertions(1);
    try {
        // Create character
        const res = await service.create(data);
        new_character = { ...data, id: res.id }
        // Expect character saved is equal from data send to save
        expect(res).toEqual(new_character)
    }
    catch (error) {
        console.log("Error in create character", error)
    }
})

test('Service getAll return characters', async () => {
    // Validate has two expect true
    expect.assertions(2);
    try {
        // List characters
        characters = await service.getAll();
        // Expect first character from list is equal character created up
        expect(characters[0]).toEqual(new_character)
        // Expect length of list of characters is equal 1
        expect(characters.length).toEqual(1)
    }
    catch (error) {
        console.log("Error in getAll characters", error)
    }
})

test('Service getById with an valid id, return character', async () => {
    // Validate has an expect true
    expect.assertions(1);
    try {
        // Get character from id valid
        const res = await service.getById(characters[0].id);
        // Expect character is equal first character from list
        expect(res).toEqual(characters[0])
    }
    catch (error) {
        console.log("Error in get character by id", error)
    }
})

test('Service getById with an not valid id, return undefined', async () => {
    // Validate has an expect true
    expect.assertions(1);
    try {
        // Get undefined from id invalid
        const res = await service.getById("ID_TEST");
        // Expect response is equal undefined because character was not found
        expect(res).toEqual(undefined)
    }
    catch (error) {
        console.log("Error in get character by id", error)
    }
})

test('Service update with an valid id, return new character', async () => {
    // Validate has an expect true
    expect.assertions(1);
    try {
        // Create a new mock
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
        // Update first character from list with new data mock
        const res = await service.update(new_character.id, new_body);
        // Get data from response after update
        const mockEntries = Object.entries(res)
        // Create an expected value to compare after
        const expectedEntries = Object.entries({ ...new_character, ...new_body })
        // Expect value from response after update is equal new data mock
        expect(JSON.stringify(mockEntries)).toEqual(JSON.stringify(expectedEntries))
        new_character = { ...new_character, ...new_body }
    }
    catch (error) {
        console.log("Error in update character", error)
    }
})

test('Service delete, delete character', async () => {
    // Validate has an expect true
    expect.assertions(1);
    try {
        // Delete unique value from list
        await service.deleteOne(characters[0].id);
        // Get characters list
        characters = await service.getAll();
        // Expect list characters length is equal 0
        expect(characters.length).toEqual(0)
    }
    catch (error) {
        console.log("Error in delete character", error)
    }
})