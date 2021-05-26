module.exports = app => {
  const { existsOrError } = app.api.validation

  const get = async (request, response) => {
    return await app.config.db.turmas.get()
        .then(docs => {
            let turmas = []
            docs.forEach(doc => {
                turmas.push({
                  id: doc.id, 
                  disciplina: doc.data().disciplina,
                  professor: doc.data().professor,
                  dias_horario: doc.data().dias_horario,
                  numero_alunos: doc.data().numero_alunos,
                  curso: doc.data().curso,
                  periodo: doc.data().periodo,
                  acessibilidade: doc.data().acessibilidade,
                  qualidade: doc.data().qualidade,
                })
            })
            return response.status(200).json(turmas)
        }).catch(err => response.status(500).send(err))
  }

  const save = async (req, res) => {
    const turma = {
        disciplina: req.body.disciplina,
        professor: req.body.professor,
        dias_horario: req.body.dias_horario,
        numero_alunos: req.body.numero_alunos,
        curso: req.body.curso,
        periodo: req.body.periodo,
        acessibilidade: req.body.acessibilidade,
        qualidade: req.body.qualidade,
    }
    //VALIDAÇÕES
    try {
        existsOrError(turma.disciplina, 'Atributo "disciplina" não informado')
        existsOrError(turma.professor, 'Atributo "professor" não informado')
        existsOrError(turma.dias_horario, 'Atributo "dias_horario" não informado')
        existsOrError(turma.numero_alunos, 'Atributo "numero_alunos" não informado')
        existsOrError(turma.curso, 'Atributo "curso" não informado')
        existsOrError(turma.periodo, 'Atributo "periodo" não informado')
        existsOrError(turma.acessibilidade, 'Atributo "acessibilidade" não informado')
        existsOrError(turma.qualidade, 'Atributo "qualidade" não informado')
    } catch (mssg) {
        return res.status(400).send(mssg)
    }
    if (req.params.id) {
        let documentRef = app.config.db.turmas.doc(req.params.id)
        return await documentRef.update(turma)
            .then(() => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } else {
        return await app.config.db.turmas.add(turma)
            .then(ref => res.status(201).send(ref.id))
            .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    let documentRef = app.config.db.turmas.doc(req.params.id)
    return await documentRef.delete()
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
  }

  return { save, get, remove }
}