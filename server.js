/**
 * package installed
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const symptoms = require('./backend/business-management/symptoms');

/**
 * initiate the local variable
 */
symptoms.getAllSymptomsInformation();

/**
 *  files required
 */
const routes = require('./backend/routes')

/**
 * instantiation of the packages/files used
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', routes);

console.log("server running on localhost:8080");
app.listen(8080);
