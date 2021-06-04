const admin = require('firebase-admin')
admin.initializeApp()

module.exports = app => { 

    const salas = admin.firestore().collection('salas')
    const turmas = admin.firestore().collection('turmas')
    const alocacao = admin.firestore().collection('alocacao')
    
    return { salas, turmas, alocacao }

}