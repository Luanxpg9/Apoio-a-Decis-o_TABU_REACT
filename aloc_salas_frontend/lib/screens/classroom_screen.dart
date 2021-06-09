import 'package:aloc_salas_frontend/models/cenario.dart';
import 'package:aloc_salas_frontend/providers/classrooms.dart';
import 'package:aloc_salas_frontend/widgets/dropdown.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ClassroomScreen extends StatefulWidget {
  @override
  _ClassroomScreenState createState() => _ClassroomScreenState();
}

class _ClassroomScreenState extends State<ClassroomScreen> {
  Cenario _selectedCenario = Cenario(1, 'Cenario 1');

  @override
  Widget build(BuildContext context) {
    final classrooms = Provider.of<Classrooms>(context);

    changeCenario(cenario) {
      setState(() {
        _selectedCenario = cenario;
      });
    }

    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text('Salas'),
          actions: [
            IconButton(
              onPressed: () => classrooms.lerCSV(cenario: _selectedCenario.id),
              icon: Icon(Icons.upload),
            ),
            IconButton(
              onPressed: () => classrooms.deleteAll(classrooms.items),
              icon: Icon(Icons.delete_sweep),
            ),
          ],
        ),
        body: Column(
          children: [
            DropDown(changeCenario),
            const SizedBox(height: 10),
            Text('Quantidade de salas: ${classrooms.countItems}'),
            const SizedBox(height: 10),
            Container(
              height: 500,
              child: ListView.builder(
                itemCount: classrooms.items.length,
                itemBuilder: (context, index) {
                  return Container(
                    margin: EdgeInsets.symmetric(horizontal: 20),
                    // decoration: BoxDecoration(
                    // borderRadius: BorderRadius.all(Radius.circular(3)),
                    // border: Border.all(width: 1),
                    // ),
                    child: Card(
                      child: ListTile(
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 30),
                        leading: Icon(Icons.home_work_rounded),
                        title: Text(
                            'ID: ${classrooms.items[index].id_sala.toString()}'),
                        subtitle: Text(
                            'Cadeiras: ${classrooms.items[index].numero_cadeiras.toString()}'),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ));
  }
}
