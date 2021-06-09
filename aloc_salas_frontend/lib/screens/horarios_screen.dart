import 'package:aloc_salas_frontend/models/alocacao.dart';
import 'package:aloc_salas_frontend/models/class.dart';
import 'package:aloc_salas_frontend/models/disponivel.dart';
import 'package:aloc_salas_frontend/models/id_aloc_item_aloc.dart';
import 'package:aloc_salas_frontend/providers/alocs.dart';
import 'package:aloc_salas_frontend/providers/classes.dart';
import 'package:aloc_salas_frontend/widgets/horario_sala_item.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HorariosScreen extends StatefulWidget {
  @override
  _HorariosScreenState createState() => _HorariosScreenState();
}

class _HorariosScreenState extends State<HorariosScreen> {
  List<Disponivel> salasDisp;

  @override
  Widget build(BuildContext context) {
    final IdAlocItemAloc idAlocItemAloc =
        ModalRoute.of(context).settings.arguments as IdAlocItemAloc;

    final ItemAlocacao itemAloc = idAlocItemAloc.itemAloc;
    final String idAloc = idAlocItemAloc.idAloc;

    final Alocs alocs = Provider.of<Alocs>(context);
    final Class turma = Provider.of<Classes>(context, listen: false)
        .items
        .singleWhere((t) => t.id == itemAloc.idTurma);

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Horarios alocados'),
        actions: [
          IconButton(
            onPressed: () {
              alocs
                  .getDisponiveis(turma.id, alocs.getById(idAloc).alocacao)
                  .then((value) {
                setState(() {
                  salasDisp = value;
                });
              });
            },
            icon: Icon(Icons.download_rounded),
          )
        ],
      ),
      body: Container(
          height: 600,
          padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Turma:   ${turma.disciplina}',
                  style: TextStyle(fontSize: 16)),
              Text('Curso:   ${turma.curso}', style: TextStyle(fontSize: 16)),
              Text('Professor:   ${turma.professor}',
                  style: TextStyle(fontSize: 16)),
              Text('N. alunos:   ${turma.numero_alunos}',
                  style: TextStyle(fontSize: 16)),
              Text('Periodo:   ${turma.periodo}',
                  style: TextStyle(fontSize: 16)),
              const SizedBox(height: 20),
              Text(
                  '${salasDisp != null ? salasDisp[0].sala : "Carregue as salas disponiveis"}'),
              const SizedBox(height: 20),
              Container(
                height: 400,
                child: Column(
                  children: itemAloc.horarios
                      .map((horario) => HorarioSalaItem(
                            horarioSala: horario,
                            salasDisp: salasDisp,
                            aplicarMudancas: (horSal, sala1) {
                              if (sala1 != null) {
                                horSal = sala1;
                                alocs.updateAlocacao(alocs.items
                                    .singleWhere((el) => el.id == idAloc));
                              }
                            },
                          ))
                      .toList(),
                ),
              )
            ],
          )),
    );
  }
}
