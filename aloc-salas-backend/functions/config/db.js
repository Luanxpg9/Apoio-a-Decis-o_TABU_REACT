const admin = require('firebase-admin')
admin.initializeApp()

module.exports = app => { 

    const salas = admin.firestore().collection('salas')
    const turmas = admin.firestore().collection('turmas')
    return { salas, turmas }

}