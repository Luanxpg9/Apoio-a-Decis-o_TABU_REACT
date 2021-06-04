const horariosDataC1 = require('../data/horarios_data')

module.exports = app => {

  const getSalasBD = async (app) => {
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
        return salas
      }).catch(err => console.log(err))
  }

  const getTurmasBD = async (app) => {
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
          return turmas
      }).catch(err => console.log(err))
  }

   // ===== Criar um Map das combinacoes horario/sala
  function criarDominio(salas) {
    const dominio = [] //[[horario, sala]]

    horariosDataC1.map((h) => salas.map(el => [h, el.id]))
      .forEach(el => el.forEach(e => dominio.push(e)))
    
    let dominioRestante = new Map()
    dominio.forEach((el, i) => {
      dominioRestante.set(i, el)
    })
    return dominioRestante //{1 => [horario, sala]}
  }

  const separarHorarios = (turmas) => {
    const discHorarios = new Map()
    turmas.forEach((turma) => {
        discHorarios.set(turma.id, turma.dias_horario.split("-"))
    })
    return discHorarios
  }

  // ===== Listar salas disponiveis do dominio restante
  function salasComHorariosDaTurma(discHor, dominioRest) { //discHor = ['2M12', '2M12', '2M12']
    let salasPossiveis = new Map()
    dominioRest.forEach((el, i) => {
      discHor.forEach(e => {
        if(e == el[0]) salasPossiveis.set(i, el)
      })
    })
    return salasPossiveis
  }

  function removerSalasSemAssentosSuficientes(disc, salas, dominioRest) {
    let salasPossiveis = new Map()
    dominioRest.forEach((el, i) => {
      let sala = salas.filter(e => e.id == el[1])[0]
      if(disc.numero_alunos <= sala.numero_cadeiras)
        salasPossiveis.set(i, el)
    })
    return salasPossiveis
  }

  function removerSalasNaoAcessiveis(salas, dominioRest) {
    let salasPossiveis = new Map()
    dominioRest.forEach((el, i) => {
      let sala = salas.filter(e => e.id == el[1])[0]
      if(sala.acessivel) {
        salasPossiveis.set(i, el)
      }
    })
    return salasPossiveis
  }

  function taxaDesocupacao(disc, sala) {
    return (sala.numero_cadeiras - disc.numero_alunos) / sala.numero_cadeiras
  }

  function selecionarMelhorSala(disc, salas, dominioRest) {
    let melhorSala
    let menorTaxa = 1000
    dominioRest.forEach((el, i) => {
      let sala = salas.filter(e => e.id == el[1])[0]
      let taxa = taxaDesocupacao(disc, sala)
      if(taxa < menorTaxa) {
        menorTaxa = taxa
        melhorSala = sala
      }
    })
    return {melhorSala, menorTaxa}
  }

  function criarValorAlocacao(sala, dominioRest) {
    let obj = {}
    dominioRest.forEach(el => {
      if(el[1] == sala.id) obj[el[0]] = el[1]
    })
    return obj
  }

  function removerHorarioSalaAlocado(valorAloc, dominioRest) {
    let array = Object.entries(valorAloc)
    let keys = []
    dominioRest.forEach((el, i) => {
      array.forEach((a) => {
        if(a[0] == el[0] && a[1] == el[1]) keys.push(i)
      })
    })
    keys.forEach(k => dominioRest.delete(k))
  }

  return { getSalasBD, getTurmasBD, criarDominio, separarHorarios, 
    salasComHorariosDaTurma, removerSalasSemAssentosSuficientes, 
    removerSalasNaoAcessiveis, taxaDesocupacao, selecionarMelhorSala, 
    criarValorAlocacao, removerHorarioSalaAlocado
  }
}