module.exports = app => {

  app.route('/salas')
      // .post(app.api.salas.save)
      .get(app.api.salas.get)
  // app.route('/salas/:id')
  //     .put(app.api.salas.save)
  //     .delete(app.api.salas.remove)

}