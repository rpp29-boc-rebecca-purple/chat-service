const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../api/routes');
require('dotenv').config();

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;