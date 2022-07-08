const middy = require("@middy/core")
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const httpEventNormalizer = require('@middy/http-event-normalizer')

module.exports = (handler => middy(handler)
    .use([
        httpEventNormalizer(),
        jsonBodyParser(),
        httpErrorHandler()
    ]))
