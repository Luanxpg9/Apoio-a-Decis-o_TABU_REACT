module.exports = app => {

  app.route('/salas')
      .post(app.api.salas.save) //post - Cria uma nova sala
      .get(app.api.salas.get) //get - retorna todas as salas

  app.route('/salas/:id')
      .put(app.api.salas.save) //put - altera uma sala por id
      .delete(app.api.salas.remove) //delete - remove uma sala por id

  app.route('/turmas')
      .post(app.api.turmas.save) //post - cria uma nova turma
      .get(app.api.turmas.get) //set - retorna todas as disciplinas

  app.route('/turmas/:id')
      .put(app.api.turmas.save) //put - altera uma turma por id
      .delete(app.api.turmas.remove) //delete - remove uma turma por id
      
  app.route('/alocacao')
      .get(app.api.alocacao.getAll) //get - retorna todas as alocacoes

  app.route('/alocacao/:id')
      .put(app.api.alocacao.save) //put - altera uma alocacao por id
      .get(app.api.alocacao.get) //get - retorna uma alocacao por id
      .delete(app.api.alocacao.remove) //delete - remove uma alocacao por id

  app.route('/run')
      .get(app.api.alocacao.run) 
      //get - executa o algoritmo e retorna o id de uma alocacao

  app.route('/calc')
      .post(app.api.alocacao.calcTaxa) 
      //post - calcula a taxa de desocupacao de uma alocacao submetida

  app.route('/salas-disponiveis/:id')
      .post(app.api.alocacao.salasDisponiveis) 
      //post - retorna as salas/horarios disponiveis dada uma turma e uma alocacao
}