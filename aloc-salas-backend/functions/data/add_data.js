const {salasDataC1} = require('./salas_data')
const {turmasDataC1} = require('./turmas_data')

module.exports = app => {

  //add salas ao banco
  if(false) {
    salasDataC1.forEach(sala => {
      app.config.db.salas.add(sala)
            .then(() => console.log('Salas adicionadas'))
            .catch(err => console.log(err))
    })
  }

  //add turmas ao banco
  if(false) {
    turmasDataC1.forEach(turma => {
      app.config.db.turmas.add(turma)
            .then(() => console.log('Turmas adicionadas'))
            .catch(err => console.log(err))
    })
  }
}