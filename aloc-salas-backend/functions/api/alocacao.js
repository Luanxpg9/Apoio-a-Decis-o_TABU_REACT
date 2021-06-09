module.exports = app => {

  const { calcTaxaDesocupacao, mapSalasDisponiveis } = app.algorithm.algoritmo_guloso
  const { getSalasBD, getTurmasBD } = app.algorithm.algoritmo_guloso_funcoes
  const { hillClimbing } = app.algorithm.hill_climbing

  const getAll = async (req, res) => {
    const salas = await getSalasBD(app)
    const turmas = await getTurmasBD(app)
    await app.config.db.alocacao.get()
    .then(docs => {
      let aloc = []
      docs.forEach(doc => {
        const alocMap = new Map(Object.entries(doc.data()))
        const taxa = calcTaxaDesocupacao(salas, turmas, alocMap)
        aloc.push({id: doc.id, taxaDesocupacao: taxa, alocacao: doc.data()})
      })
      res.status(200).json(aloc)
    })
    .catch(err => res.status(500).send(err))
  }

  const get = async (req, res) => {
    const salas = await getSalasBD(app)
    const turmas = await getTurmasBD(app)
    let alocRef = app.config.db.alocacao.doc(req.params.id)
    await alocRef.get()
    .then(doc => {
      const alocMap = new Map(Object.entries(doc.data()))
      const taxa = calcTaxaDesocupacao(salas, turmas, alocMap)
      res.status(200).json({id: doc.id, taxaDesocupacao: taxa, alocacao: doc.data()})
    })
    .catch(err => res.status(500).send(err))
  }

  const save = async (req, res) => {
    const aloc = new Map(Object.entries(req.body))
    if(aloc.size < 5) return res.status(404).send('Submeta uma alocacao valida')

    if(req.params.id) {
      let documentRef = app.config.db.alocacao.doc(req.params.id)
      return await documentRef.update(req.body)
          .then(() => res.status(204).send())
          .catch(err => res.status(500).send(err))
    } else {
      return await app.config.db.alocacao.add(req.body)
            .then(ref => res.status(201).send(ref.id))
            .catch(err => res.status(500).send(err))
    }
  }

  const remove = async (req, res) => {
    let documentRef = app.config.db.alocacao.doc(req.params.id)
    return await documentRef.delete()
        .then(() => res.status(204).send())
        .catch(err => res.status(500).send(err))
  }

  const calcTaxa = async (req, res) => {
    const aloc = new Map(Object.entries(req.body))
    if(aloc.size < 5) return res.status(404).send('Submeta uma alocacao valida')
    const salas = await getSalasBD(app)
    const turmas = await getTurmasBD(app)

    const taxa = calcTaxaDesocupacao(salas, turmas, aloc)
    if(taxa != null) {
      res.status(200).json({taxaDesocupacao: taxa})
    }else{
      res.status(500).send('Não foi possiveil calcular a taxa')
    }
  }

  const run = async (req, res) => {
    const salas = await getSalasBD(app)
    const turmas = await getTurmasBD(app)
    const alocacao = hillClimbing(salas, turmas) // {discID => {"3M12":"500","4M12":"500"}}
    const alocObj = Object.fromEntries(alocacao) // {"COMP0250":{"3M12":"500","4M12":"500"}}

    const alocId = await app.config.db.alocacao.add(alocObj)
      .then(doc => res.status(200).json(doc.id))
      .catch(err => res.status(500).send(err))
  }

  const salasDisponiveis = async (req, res) => {
    const aloc = new Map(Object.entries(req.body))
    if(aloc.size < 5) return res.status(404).send('Submeta uma alocacao valida')
    const turmas = await getTurmasBD(app)
    const turma = turmas.filter(turma => turma.id == req.params.id)[0]
    if(turma == null) return res.status(404).send('Id da turma invalido')
    const salas = await getSalasBD(app)
    const disponiveis = mapSalasDisponiveis(turma, salas, aloc)

    const resultado = {}
    disponiveis.forEach(item => {
      resultado[item[0]] = item[1]
    })

    res.status(200).json(resultado) //{horario: sala}
  }

  return { getAll, get, run, save, calcTaxa, remove, salasDisponiveis }
}
