module.exports = app => {
  // const { existsOrError } = app.api.validation

  const get = async (request, response) => {
    return await app.config.db.salas.get()
        .then(docs => {
            let salas = []
            docs.forEach(doc => {
                salas.push({
                  id: doc.id, 
                  id_sala: doc.data().id_sala,
                  numero_cadeiras: doc.data().numero_cadeiras,
                  acessivel: doc.data().acessivel,
                  qualidade: doc.data().qualidade,
                })
            })
            return response.status(200).json(salas)
        }).catch(err => response.status(500).send(err))
  }


  return { get }
  // return { save, get, remove }
}