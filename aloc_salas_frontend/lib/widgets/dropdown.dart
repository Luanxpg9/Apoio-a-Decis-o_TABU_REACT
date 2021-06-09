import 'package:aloc_salas_frontend/models/cenario.dart';
import 'package:flutter/material.dart';

class DropDown extends StatefulWidget {
  final Function onchanged;
  DropDown(this.onchanged) : super();

  final String title = "DropDown Demo";

  @override
  DropDownState createState() => DropDownState();
}

class DropDownState extends State<DropDown> {
  //
  List<Cenario> _cenarios = Cenario.getCenarios();
  List<DropdownMenuItem<Cenario>> _dropdownMenuItems;
  Cenario _selectedCenario;

  @override
  void initState() {
    _dropdownMenuItems = buildDropdownMenuItems(_cenarios);
    _selectedCenario = _dropdownMenuItems[0].value;
    super.initState();
  }

  List<DropdownMenuItem<Cenario>> buildDropdownMenuItems(List cenarios) {
    List<DropdownMenuItem<Cenario>> items = [];
    for (Cenario cenario in cenarios) {
      items.add(
        DropdownMenuItem(
          value: cenario,
          child: Text(cenario.name),
        ),
      );
    }
    return items;
  }

  onChangeDropdownItem(Cenario selectedCenario) {
    setState(() {
      _selectedCenario = selectedCenario;
      widget.onchanged(selectedCenario);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      decoration: BoxDecoration(
          color: Theme.of(context).primaryColorLight,
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(20),
            bottomRight: Radius.circular(20),
          )),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          const Text("Selecione o cenário:"),
          const SizedBox(width: 30),
          DropdownButton(
            value: _selectedCenario,
            items: _dropdownMenuItems,
            onChanged: onChangeDropdownItem,
          ),
          // Text('Selected: ${_selectedCenario.name}'),
        ],
      ),
    );
  }
}
