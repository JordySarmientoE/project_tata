const responseGetAll = (table, data) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `${table} list`,
                status: 200,
                data
            },
            null,
            2
        )
    }
}

const responseError = () => {
    return {
        statusCode: 500,
        body: JSON.stringify(
            {
                message: 'An error has ocurred',
                status: 500
            },
            null,
            2
        )
    }
}

const responseCreate = (table, data) => {
    return {
        statusCode: 201,
        body: JSON.stringify(
            {
                message: `${table} created`,
                status: 201,
                data
            },
            null,
            2
        )
    }
}

const responseNotFound = (table) => {
    return {
        statusCode: 404,
        body: JSON.stringify(
            {
                message: `${table} not found`,
                status: 404
            },
            null,
            2
        )
    }
}

const responseGetById = (table, data) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `${table} info`,
                status: 200,
                data
            },
            null,
            2
        )
    }
}

const responseUpdate = (table, data) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `${table} update`,
                status: 200,
                data
            },
            null,
            2
        )
    }
}

const responseDelete = (table) => {
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `${table} delete`,
                status: 200
            },
            null,
            2
        )
    }
}

module.exports = {
    responseGetAll,
    responseError,
    responseCreate,
    responseNotFound,
    responseGetById,
    responseUpdate,
    responseDelete
}