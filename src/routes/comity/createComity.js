const {Comity} = require('../../db/sequelize')
const {ValidationError, UniqueConstraintError} = require('sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
    app.post('/')
}