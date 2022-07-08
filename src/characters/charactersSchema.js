const characterSchema = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                name_character: { type: 'string' },
                height: { type: 'string' },
                mass: { type: 'string' },
                hair_color: { type: 'string' },
                skin_color: { type: 'string' },
                eye_color: { type: 'string' },
                birth_year: { type: 'string' },
                gender: { type: 'string' }
            },
            required: ['name_character', 'height', 'mass', 'hair_color',
                'skin_color', 'eye_color', 'birth_year', 'gender']
        }
    }
}

module.exports = characterSchema