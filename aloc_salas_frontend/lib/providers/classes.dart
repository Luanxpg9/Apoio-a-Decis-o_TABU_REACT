import 'dart:convert';

import 'package:aloc_salas_frontend/models/class.dart';
import 'package:aloc_salas_frontend/utils/constants.dart';
import 'package:csv/csv.dart';
import 'package:csv/csv_settings_autodetection.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class Classes with ChangeNotifier {
  final String _baseUrl = '${Constants.BASE_API_URL}/turmas';
  List<Class> _items = [];

  Classes() {
    loadClasses();
  }

  List<Class> get items => [..._items];

  int get countItems => _items.length;

  lerCSV({@required int cenario}) async {
    var d = new FirstOccurrenceSettingsDetector(
        eols: ['\r\n', '\n'], textDelimiters: ['"', "'"]);
    final myData =
        await rootBundle.loadString("assets/csv/cenario$cenario-turmas.csv");
    List<List<dynamic>> rowsAsListOfValues =
        CsvToListConverter(csvSettingsDetector: d).convert(myData);
    List<Class> classes = [];
    rowsAsListOfValues.forEach((el) {
      if (el[0] != 'disciplina') {
        classes.add(Class(
            disciplina: el[0],
            professor: el[1],
            dias_horario: el[2],
            numero_alunos: el[3],
            curso: el[4],
            periodo: el[5],
            acessibilidade: el[6],
            qualidade: el[7]));
      }
    });
    await deleteAll([..._items]);
    _items.clear();
    await addAll(classes);
  }

  Future<void> loadClasses() async {
    final response = await http.get("$_baseUrl");
    List<dynamic> data = json.decode(response.body);

    _items.clear();
    if (data != null) {
      data.forEach((classData) {
        _items.add(Class(
            id: classData['id'],
            disciplina: classData['disciplina'],
            professor: classData['professor'],
            dias_horario: classData['dias_horario'],
            numero_alunos: classData['numero_alunos'],
            curso: classData['curso'],
            periodo: classData['periodo'],
            acessibilidade: classData['acessibilidade'],
            qualidade: classData['qualidade']));
      });
      notifyListeners();
    }
    return Future.value();
  }

  Future<void> addClass(Class newClass) async {
    final response = await http.post(
      "$_baseUrl",
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode({
        'disciplina': newClass.disciplina,
        'professor': newClass.professor,
        'dias_horario': newClass.dias_horario,
        'numero_alunos': newClass.numero_alunos,
        'curso': newClass.curso,
        'periodo': newClass.periodo,
        'acessibilidade': newClass.acessibilidade,
        'qualidade': newClass.qualidade
      }),
    );
    // print(response.body);
    _items.add(Class(
        id: response.body,
        disciplina: newClass.disciplina,
        professor: newClass.professor,
        dias_horario: newClass.dias_horario,
        numero_alunos: newClass.numero_alunos,
        curso: newClass.curso,
        periodo: newClass.periodo,
        acessibilidade: newClass.acessibilidade,
        qualidade: newClass.qualidade));
    notifyListeners();
  }

  Future<void> deleteClass(String id) async {
    final index = _items.indexWhere((class1) => class1.id == id);
    if (index >= 0) {
      final class1 = _items[index];
      _items.remove(class1);
      notifyListeners();

      final response = await http.delete("$_baseUrl/${class1.id}");

      if (response.statusCode >= 400) {
        _items.insert(index, class1);
        notifyListeners();
      }
    }
  }

  Future<void> addAll(List<Class> items) async {
    items.forEach((class1) async {
      await addClass(class1);
      // print(classroom.id_sala);
    });
  }

  Future<void> deleteAll(List<Class> items) async {
    items.forEach((class1) async {
      await deleteClass(class1.id);
    });
  }
}
