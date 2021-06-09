import 'package:flutter/foundation.dart';

class Class {
  final String id;
  final String disciplina;
  final String professor;
  final String dias_horario;
  final int numero_alunos;
  final String curso;
  final int periodo;
  final int acessibilidade;
  final int qualidade;

  const Class({
    this.id,
    @required this.disciplina,
    @required this.professor,
    @required this.dias_horario,
    @required this.numero_alunos,
    @required this.curso,
    @required this.periodo,
    @required this.acessibilidade,
    @required this.qualidade,
  });
}
