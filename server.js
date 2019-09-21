/**
 * package installed
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

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
