const functions = require('firebase-functions')
const consign = require('consign')
const app = require('express')()

consign()
  .include('./config/db.js')
  .then('/algorithm/algoritmo_guloso_funcoes.js')
  .then('/algorithm')
  .then('/api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app)

exports.api = functions.https.onRequest(app)
