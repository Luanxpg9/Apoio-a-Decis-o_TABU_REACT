module.exports = app => {

  app.route('/salas')
      .post(app.api.salas.save)
      .get(app.api.salas.get)
  app.route('/salas/:id')
      .put(app.api.salas.save)
      .delete(app.api.salas.remove)

  app.route('/turmas')
      .post(app.api.turmas.save)
      .get(app.api.turmas.get)
  app.route('/turmas/:id')
      .put(app.api.turmas.save)
      .delete(app.api.turmas.remove)

}