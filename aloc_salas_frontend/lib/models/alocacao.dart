import 'package:flutter/material.dart';

class HorarioSala {
  final String horario;
  String sala;

  HorarioSala({
    @required this.horario,
    @required this.sala,
  });
}

class ItemAlocacao {
  final String idTurma;
  final List<HorarioSala> horarios;
  ItemAlocacao({
    @required this.idTurma,
    @required this.horarios,
  });
}

class Alocacao {
  final String id;
  final double taxaDesocupacao;
  final List<ItemAlocacao> alocacao;

  Alocacao({
    this.id,
    this.taxaDesocupacao,
    @required this.alocacao,
  });
}
