import * as functions from 'firebase-functions';
import express = require('express')

var bodyParser = require('body-parser')

const app: express.Application = express();

//all routes used
import parse from './handlers/parse'

app.use(bodyParser.json())
app.use('/', parse)


exports.api = functions.https.onRequest(app)
