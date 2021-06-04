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
    taxaDesocupacao, selecionarMelhorSala, criarValorAlocacao, removerHorarioSalaAlocado
  } = app.algorithm.algoritmo_guloso_funcoes

  const algoritmoGuloso = (salas, turmas) => {
    const dominioRestante = criarDominio(salas)
    const discHorarios = separarHorarios(turmas)
    let taxaDesocupacao = 0
    const alocacao = new Map()

    discHorarios.forEach((value, index) => {
      const disciplina = turmas.filter(turma => turma.id == index)[0]
      let salasDisponiveis = salasComHorariosDaTurma(value, dominioRestante)
      salasDisponiveis = removerSalasSemAssentosSuficientes(disciplina, salas, salasDisponiveis)
      if(disciplina.acessibilidade)
        salasDisponiveis = removerSalasNaoAcessiveis(salas, salasDisponiveis)
      let {melhorSala, menorTaxa} = selecionarMelhorSala(disciplina, salas, salasDisponiveis)
      taxaDesocupacao += menorTaxa
      alocacao.set(index, criarValorAlocacao(melhorSala, salasDisponiveis))
      removerHorarioSalaAlocado(alocacao.get(index), dominioRestante)
    })

    return {alocacao, taxaDesocupacao}
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

  return { algoritmoGuloso, calcTaxaDesocupacao }
}