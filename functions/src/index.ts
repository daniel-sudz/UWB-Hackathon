import * as functions from 'firebase-functions';
import express = require('express')

const app: express.Application = express();


//all routes used
import parse from './handlers/parse'

app.use('/', parse)

exports.api = functions.https.onRequest(app)