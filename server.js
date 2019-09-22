/**
 * package installed
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const symptoms = require('./backend/business-management/symptoms');
const cors = require('cors');

/**
 * initiate the local variable
 */
symptoms.getAllSymptomsInformation();

/**
 * API documentation route
 */
 var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./documentation/swagger.json');
app.use(cors({credentials: true, origin: 'http://localhost:8080'}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
module.exports = app
app.listen(8080);

