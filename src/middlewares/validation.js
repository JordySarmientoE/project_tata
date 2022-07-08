const middy = require("@middy/core")
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')

// Bodyparser and error handler when an error ocurrs catch them and set a fallback message
module.exports = (handler => middy(handler)
    .use([
        jsonBodyParser(),
        httpErrorHandler()
    ]))
