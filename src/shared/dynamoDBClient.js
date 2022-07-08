const AWS = require("aws-sdk");

const DynamoDBClient = (options) => {
    return new AWS.DynamoDB.DocumentClient(options)
}

module.exports = DynamoDBClient