module.exports = app => {

  const { algoritmoGuloso, calcTaxaDesocupacao, mapSalasDisponiveis } = app.algorithm.algoritmo_guloso

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  const copy = (aloc) => {
    return new Map(aloc)
  }

  function criarValorAlocacao(horariosDaTurma, salasDisponiveis) {
    let obj = {}
    horariosDaTurma.forEach(horario => {
      const salasHorario = new Map()
      salasDisponiveis.forEach((itemDominio, i) => { //{1 => [horario, sala]}
        if(itemDominio[0] == horario) {
          salasHorario.set(i, itemDominio)
        }
      })
      const index = getRandom(0, salasHorario.size - 1)
      let cont = 0
      let itemDom
      salasHorario.forEach((e, i) => {
        if(index == cont) itemDom = [i, e]
        cont++
      })
      obj[horario] = itemDom[1][1]
      salasDisponiveis.delete(itemDom[0])
    })
    return obj //{horario: salaid, horario: salaid}
  }

  const tweak = (turmas, salas, aloc) => {
    const prob = 0.5
    turmas.forEach(turma => {
      if (prob >= Math.random()) {
        let dominioDisponivel = mapSalasDisponiveis(turma, salas, aloc) // {1 => [3M12, 500]}
        const horariosDaTurma = turma.dias_horario.split("-")
        const valorAlocacao = criarValorAlocacao(horariosDaTurma, dominioDisponivel)
        aloc.set(turma.id, valorAlocacao)
      }else{
        aloc.set(turma.id, aloc.get(turma.id))
      }
    })
    return aloc
  }

  const hillClimbing = (salas, turmas) => {
    let S = algoritmoGuloso(salas, turmas)
    const repeticoes = 500
    for(let i = 0; i < repeticoes; i++) {
      let R = tweak(turmas, salas, copy(S))
      if (calcTaxaDesocupacao(salas, turmas, R) < calcTaxaDesocupacao(salas, turmas, S))
        S = R
    }
    return S
  }
  
  return { hillClimbing }
}