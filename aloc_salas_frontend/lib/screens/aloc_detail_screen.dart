import 'package:aloc_salas_frontend/models/alocacao.dart';
import 'package:aloc_salas_frontend/models/id_aloc_item_aloc.dart';
import 'package:aloc_salas_frontend/providers/classes.dart';
import 'package:aloc_salas_frontend/utils/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class AlocDetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final Alocacao aloc = ModalRoute.of(context).settings.arguments as Alocacao;
    final List<ItemAlocacao> listAloc = aloc.alocacao;
    final Classes classes = Provider.of<Classes>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Detalhe Alocação'),
        actions: [
          IconButton(
            onPressed: () {},
            icon: Icon(Icons.delete_forever),
          )
        ],
      ),
      body: ListView.builder(
          itemCount: aloc.alocacao.length,
          itemBuilder: (context, index) {
            return Card(
              margin: EdgeInsets.symmetric(horizontal: 20, vertical: 3),
              child: ListTile(
                title: Text(
                    'Turma: ${classes.items.singleWhere((el) => el.id == listAloc[index].idTurma).disciplina}'),
                subtitle: Text(
                    'Alunos matriculados: ${classes.items.singleWhere((el) => el.id == listAloc[index].idTurma).numero_alunos}'),
                trailing: Icon(Icons.search),
                onTap: () {
                  Navigator.of(context).pushNamed(
                    AppRoutes.HORARIOS_SCREEN,
                    arguments: IdAlocItemAloc(aloc.id, listAloc[index]),
                  );
                },
              ),
            );
          }),
    );
  }
}
