// ===== Criar uma alocacao =====
// 1 - selecionar uma turma
// 2 - selecionar salas disponiveis para a disciplina
// 3 - eliminar salas com quantidade de assentos inferior ao numero de alunos matriculados na turma
// 4 - eliminar salas n acessiveis para turmas com acessibilidade
// 5 - escolher a sala com a menor taxa de Desocupacao (add outros criterios posteriormente)
// 6 - add os horarios selecionados a lista de alocação
// 7 - remover os horarios selecionados da lista "dominioRestante"
// 8 - repetir para a proxima turma

module.exports = app => {

  const { criarDominio, separarHorarios, salasComHorariosDaTurma, 
    removerSalasSemAssentosSuficientes, removerSalasNaoAcessiveis, 
    taxaDesocupacao, criarValorAlocacao, removerHorarioSalaAlocado
  } = app.algorithm.algoritmo_guloso_funcoes

  const algoritmoGuloso = (salas, turmas) => {
    const dominioRestante = criarDominio(salas) // {1 => [horario, sala]}
    const discHorarios = separarHorarios(turmas) // {turmaId => [horario1, horario2]}
    const alocacao = new Map()

    discHorarios.forEach((horariosDaTurma, index) => {
      const turma = turmas.filter(turma => turma.id == index)[0]
      let salasDisponiveis = salasComHorariosDaTurma(horariosDaTurma, dominioRestante)
      salasDisponiveis = removerSalasSemAssentosSuficientes(turma, salas, salasDisponiveis)
      if(turma.acessibilidade)
        salasDisponiveis = removerSalasNaoAcessiveis(salas, salasDisponiveis)
      const valorAlocacao = criarValorAlocacao(turma, horariosDaTurma, salas, salasDisponiveis)
      alocacao.set(index, valorAlocacao)
      removerHorarioSalaAlocado(valorAlocacao, dominioRestante)
    })

    return alocacao
  }

  const calcTaxaDesocupacao = (salas, turmas, aloc) => {
    let taxa = 0
    aloc.forEach((value, index) => {
      const valueArray = Object.entries(value)
      const sala = salas.filter(e => e.id == valueArray[0][1])[0]
      const turma = turmas.filter(e => e.id == index)[0]
      taxa += taxaDesocupacao(turma, sala)
    })
    return taxa
  }

  const mapSalasDisponiveis = (turma, salas, aloc) => {
    const dominioRestante = criarDominio(salas) //{1 => [horario, sala]}
    const discHorarios = separarHorarios([turma])

    const horariosTurma = discHorarios.get(turma.id)
    let salasDisponiveis = salasComHorariosDaTurma(horariosTurma, dominioRestante) //{1 => [horario, sala]}
    salasDisponiveis = removerSalasSemAssentosSuficientes(turma, salas, salasDisponiveis)
    if(turma.acessibilidade)
      salasDisponiveis = removerSalasNaoAcessiveis(salas, salasDisponiveis)

    const disponiveis = new Map(salasDisponiveis)
    //Remover as salas/horario que ja estao alocados
    aloc.forEach((value, index) => { //{discID => {"3M12":"500","4M12":"500"}}
      const salasHorarios = Object.entries(value) //[[3M12, 500], [4M12, 500]]
      salasHorarios.forEach(el => { //[3M12, 500]
        salasDisponiveis.forEach((domItem, i) => {
          if(el[0] == domItem[0] && el[1] == domItem[1]) {
            disponiveis.delete(i)
          }
        })
      })
    })
    return disponiveis // {1 => [3M12, 500]}
  }

  return { algoritmoGuloso, calcTaxaDesocupacao, mapSalasDisponiveis }
}