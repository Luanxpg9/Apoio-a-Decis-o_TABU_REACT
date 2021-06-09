import 'package:aloc_salas_frontend/models/cenario.dart';
import 'package:aloc_salas_frontend/providers/classes.dart';
import 'package:aloc_salas_frontend/widgets/dropdown.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ClassScreen extends StatefulWidget {
  @override
  _ClassScreenState createState() => _ClassScreenState();
}

class _ClassScreenState extends State<ClassScreen> {
  Cenario _selectedCenario = Cenario(1, 'Cenario 1');

  @override
  Widget build(BuildContext context) {
    final classes = Provider.of<Classes>(context);

    changeCenario(cenario) {
      setState(() {
        _selectedCenario = cenario;
      });
    }

    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text('Turmas'),
          actions: [
            IconButton(
              onPressed: () => classes.lerCSV(cenario: _selectedCenario.id),
              icon: Icon(Icons.upload),
            ),
            IconButton(
              onPressed: () => classes.deleteAll(classes.items),
              icon: Icon(Icons.delete_sweep),
            ),
          ],
        ),
        body: Column(
          children: [
            DropDown(changeCenario),
            const SizedBox(height: 10),
            Text('Quantidade de turmas: ${classes.countItems}'),
            const SizedBox(height: 10),
            Container(
              height: 500,
              child: ListView.builder(
                itemCount: classes.items.length,
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
                        leading: Icon(Icons.note_alt_outlined),
                        title: Text(
                            'Disciplina: ${classes.items[index].disciplina}'),
                        subtitle: Text(
                            'Horários: ${classes.items[index].dias_horario}'),
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
