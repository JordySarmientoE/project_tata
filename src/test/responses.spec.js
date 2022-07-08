const { responseGetAll, responseCreate, responseDelete, responseError, responseGetById, responseNotFound, responseUpdate } = require('../shared/response')
const TableName = require('../shared/tableNames')
const table = TableName.Characters

test('Responses is an object', () => {
    expect(typeof responseCreate()).toBe('object')
    expect(typeof responseGetAll()).toBe('object')
    expect(typeof responseDelete()).toBe('object')
    expect(typeof responseError()).toBe('object')
    expect(typeof responseGetById()).toBe('object')
    expect(typeof responseNotFound()).toBe('object')
    expect(typeof responseUpdate()).toBe('object')
})

test('Return create response from table', () => {
    const res = responseCreate(table, { name: 'Jordy' })
    expect(res.statusCode).toBe(201)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} created`,
            status: 201,
            data: { name: 'Jordy' }
        },
        null,
        2
    ))
})

test('Return getAll response from table', () => {
    const res = responseGetAll(table, { name: 'Jordy' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} list`,
            status: 200,
            data: { name: 'Jordy' }
        },
        null,
        2
    ))
})

test('Return delete response from table', () => {
    const res = responseDelete(table)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} delete`,
            status: 200
        },
        null,
        2
    ))
})

test('Return error response from table', () => {
    const res = responseError()
    expect(res.statusCode).toBe(500)
    expect(res.body).toBe(JSON.stringify(
        {
            message: 'An error has ocurred',
            status: 500
        },
        null,
        2
    ))
})

test('Return getById response from table', () => {
    const res = responseGetById(table, { name: 'Jordy' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} info`,
            status: 200,
            data: { name: 'Jordy' }
        },
        null,
        2
    ))
})

test('Return notFound response from table', () => {
    const res = responseNotFound(table)
    expect(res.statusCode).toBe(404)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} not found`,
            status: 404
        },
        null,
        2
    ))
})

test('Return update response from table', () => {
    const res = responseUpdate(table, { name: 'Jordy' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe(JSON.stringify(
        {
            message: `${table} update`,
            status: 200,
            data: { name: 'Jordy' }
        },
        null,
        2
    ))
})