import 'package:flutter/foundation.dart';

class Classroom {
  final String id;
  final int id_sala;
  final int numero_cadeiras;
  final int acessivel;
  final int qualidade;

  const Classroom({
    this.id,
    @required this.id_sala,
    @required this.numero_cadeiras,
    @required this.acessivel,
    @required this.qualidade,
  });
}
