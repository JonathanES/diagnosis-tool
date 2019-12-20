const api =require('express').Router();
const diagnosis = require('./diagnosis')(api);
module.exports = api;