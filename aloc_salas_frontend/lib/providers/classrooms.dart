import 'dart:convert';

import 'package:aloc_salas_frontend/models/classroom.dart';
import 'package:aloc_salas_frontend/utils/constants.dart';
import 'package:csv/csv.dart';
import 'package:csv/csv_settings_autodetection.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;

class Classrooms with ChangeNotifier {
  final String _baseUrl = '${Constants.BASE_API_URL}/salas';
  List<Classroom> _items = [];

  Classrooms() {
    loadClassrooms();
  }

  List<Classroom> get items => [..._items];

  int get countItems => _items.length;

  Classroom getById(String id) {
    return _items.singleWhere((el) => el.id == id);
  }

  lerCSV({@required int cenario}) async {
    var d = new FirstOccurrenceSettingsDetector(
        eols: ['\r\n', '\n'], textDelimiters: ['"', "'"]);
    final myData =
        await rootBundle.loadString("assets/csv/cenario$cenario-salas.csv");
    List<List<dynamic>> rowsAsListOfValues =
        CsvToListConverter(csvSettingsDetector: d).convert(myData);
    List<Classroom> classrooms = [];
    rowsAsListOfValues.forEach((el) {
      if (el[0] != 'id_sala') {
        classrooms.add(Classroom(
            id_sala: el[0],
            numero_cadeiras: el[1],
            acessivel: el[2],
            qualidade: el[3]));
      }
    });
    await addAll(classrooms);
  }

  Future<void> loadClassrooms() async {
    final response = await http.get("$_baseUrl");
    List<dynamic> data = json.decode(response.body);

    _items.clear();
    if (data != null) {
      data.forEach((classroomData) {
        _items.add(Classroom(
            id: classroomData['id'],
            id_sala: classroomData['id_sala'],
            numero_cadeiras: classroomData['numero_cadeiras'],
            acessivel: classroomData['acessivel'],
            qualidade: classroomData['qualidade']));
      });
      notifyListeners();
    }
    return Future.value();
  }

  Future<void> addClassroom(Classroom newClassroom) async {
    final response = await http.post(
      "$_baseUrl",
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode({
        'id_sala': newClassroom.id_sala,
        'numero_cadeiras': newClassroom.numero_cadeiras,
        'acessivel': newClassroom.acessivel,
        'qualidade': newClassroom.qualidade
      }),
    );
    print(response.body);
    _items.add(Classroom(
        id: response.body,
        id_sala: newClassroom.id_sala,
        numero_cadeiras: newClassroom.numero_cadeiras,
        acessivel: newClassroom.acessivel,
        qualidade: newClassroom.qualidade));
    notifyListeners();
  }

  Future<void> deleteClassroom(String id) async {
    final index = _items.indexWhere((classr) => classr.id == id);
    if (index >= 0) {
      final classroom = _items[index];
      _items.remove(classroom);
      notifyListeners();

      final response = await http.delete("$_baseUrl/${classroom.id}");

      if (response.statusCode >= 400) {
        _items.insert(index, classroom);
        notifyListeners();
      }
    }
  }

  Future<void> addAll(List<Classroom> items) async {
    items.forEach((classroom) async {
      await addClassroom(classroom);
      // print(classroom.id_sala);
    });
  }

  Future<void> deleteAll(items) async {
    items.forEach((classroom) async {
      await deleteClassroom(classroom.id);
    });
  }
}
  // Future<void> updateClassroom(Classroom classroom) async {
  //   if (classroom == null || classroom.id == null) {
  //     return;
  //   }

  //   final index = _items.indexWhere((classr) => classr.id == classroom.id);
  //   if (index >= 0) {
  //     await http.put(
  //       "$_baseUrl/${classroom.id}",
  //       headers: <String, String>{
  //         'Content-Type': 'application/json; charset=UTF-8',
  //       },
  //       body: json.encode({
  //         'id_sala': classroom.id_sala,
  //         'numero_cadeiras': classroom.numero_cadeiras,
  //         'acessivel': classroom.acessivel,
  //         'qualidade': classroom.qualidade
  //       }),
  //     );
  //     _items[index] = classroom;
  //     notifyListeners();
  //   }
  // }