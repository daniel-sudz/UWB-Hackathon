import * as functions from 'firebase-functions';
import express = require('express')

const bodyParser = require('body-parser')

const app: express.Application = express();

//all routes used
import parse from './handlers/parse'

app.use(bodyParser.json())
app.use('/', parse)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

exports.api = functions.https.onRequest(app)