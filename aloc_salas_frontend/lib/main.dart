import 'package:aloc_salas_frontend/providers/alocs.dart';
import 'package:aloc_salas_frontend/providers/classes.dart';
import 'package:aloc_salas_frontend/providers/classrooms.dart';
import 'package:aloc_salas_frontend/screens/aloc_detail_screen.dart';
import 'package:aloc_salas_frontend/screens/aloc_screen.dart';
import 'package:aloc_salas_frontend/screens/class_screen.dart';
import 'package:aloc_salas_frontend/screens/classroom_screen.dart';
import 'package:aloc_salas_frontend/screens/home_screen.dart';
import 'package:aloc_salas_frontend/screens/horarios_screen.dart';
import 'package:aloc_salas_frontend/utils/app_routes.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (ctx) => Classes(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => Classrooms(),
        ),
        ChangeNotifierProvider(
          create: (ctx) => Alocs(),
        ),
      ],
      child: MaterialApp(
        title: 'Aloc Salas',
        theme: ThemeData(
          primarySwatch: Colors.deepPurple,
        ),
        home: HomeScreen(),
        routes: {
          AppRoutes.CLASS_SCREEN: (ctx) => ClassScreen(),
          AppRoutes.CLASSROOM_SCREEN: (ctx) => ClassroomScreen(),
          AppRoutes.ALOC_SCREEN: (ctx) => AlocScreen(),
          AppRoutes.ALOC_DETAIL_SCREEN: (ctx) => AlocDetailScreen(),
          AppRoutes.HORARIOS_SCREEN: (ctx) => HorariosScreen(),
        },
      ),
    );
  }
}
