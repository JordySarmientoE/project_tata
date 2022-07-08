'use strict';
const controller = require('./charactersController');
const validator = require('@middy/validator')
const characterSchema = require('./charactersSchema')
const middleware = require('../middlewares/validation')

const getAll = async (event) => {
  const response = await controller.getAll(event);
  return response
};

const create = async (event) => {
  const response = await controller.create(event);
  return response
}

const getById = async (event) => {
  const response = await controller.getById(event);
  return response
}

const update = async (event) => {
  const response = await controller.update(event);
  return response
}

const deleteOne = async (event) => {
  const response = await controller.deleteOne(event);
  return response
}

module.exports = {
  getAll,
  create: middleware(create).use(validator({ inputSchema: characterSchema })),
  getById,
  update: middleware(create),
  deleteOne
}