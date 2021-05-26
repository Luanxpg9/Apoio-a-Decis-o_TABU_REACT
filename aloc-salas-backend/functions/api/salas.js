module.exports = app => {
  const { existsOrError } = app.api.validation

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

  const save = async (req, res) => {
    const sala = {
        id_sala: req.body.id_sala,
        numero_cadeiras: req.body.numero_cadeiras,
        acessivel: req.body.acessivel,
        qualidade: req.body.qualidade,
    }
    console.log(sala)
    //VALIDAÇÕES
    try {
        existsOrError(sala.id_sala, 'Atributo "id_sala" não informado')
        existsOrError(sala.numero_cadeiras, 'Atributo "numero_cadeiras" não informado')
        existsOrError(sala.acessivel, 'Atributo "acessivel" não informado')
        existsOrError(sala.qualidade, 'Atributo "qualidade" não informado')
    } catch (mssg) {
        return res.status(400).send(mssg)
    }
    if (req.params.id) {
        let documentRef = app.config.db.salas.doc(req.params.id)
        return await documentRef.update(sala)
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        return await app.config.db.salas.add(sala)
            .then(ref => res.status(201).send(ref.id))
            .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    let documentRef = app.config.db.salas.doc(req.params.id)
    return await documentRef.delete()
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
  }

  return { save, get, remove }
}