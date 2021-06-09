import 'package:aloc_salas_frontend/models/alocacao.dart';
import 'package:aloc_salas_frontend/models/classroom.dart';
import 'package:aloc_salas_frontend/models/disponivel.dart';
import 'package:aloc_salas_frontend/models/room.dart';
import 'package:aloc_salas_frontend/providers/classrooms.dart';
import 'package:aloc_salas_frontend/widgets/classrooms_dropdown.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HorarioSalaItem extends StatefulWidget {
  final HorarioSala horarioSala;
  final List<Disponivel> salasDisp;
  final Function aplicarMudancas;

  HorarioSalaItem({this.horarioSala, this.salasDisp, this.aplicarMudancas});

  @override
  _HorarioSalaItemState createState() => _HorarioSalaItemState();
}

class _HorarioSalaItemState extends State<HorarioSalaItem> {
  Room _room;

  onchanged(room) {
    setState(() {
      _room = room;
    });
  }

  List<Room> criarLista(classrooms) {
    List<Room> list = [];
    widget.salasDisp.forEach((e) {
      if (e.horario == widget.horarioSala.horario)
        list.add(Room(
            name: classrooms.items
                .singleWhere((el) => el.id == e.sala)
                .id_sala
                .toString(),
            salaId: e.sala));
    });
    return list;
  }

  @override
  Widget build(BuildContext context) {
    final Classrooms classrooms =
        Provider.of<Classrooms>(context, listen: false);
    final Classroom sala =
        classrooms.items.singleWhere((el) => el.id == widget.horarioSala.sala);

    return Container(
      child: Card(
        margin: EdgeInsets.symmetric(vertical: 3),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('${widget.horarioSala.horario}'),
              Text('${sala.id_sala}'),
              if (widget.salasDisp != null)
                Row(
                  children: [
                    ClassroomsDropDown(onchanged, criarLista(classrooms)),
                    IconButton(
                        onPressed: () {
                          widget.aplicarMudancas(widget.horarioSala, _room);
                        },
                        icon: Icon(Icons.cached))
                  ],
                ),
            ],
          ),
        ),
      ),
    );
  }
}
