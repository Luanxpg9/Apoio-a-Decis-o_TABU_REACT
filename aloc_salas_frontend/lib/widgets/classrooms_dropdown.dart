import 'package:aloc_salas_frontend/models/room.dart';
import 'package:flutter/material.dart';

class ClassroomsDropDown extends StatefulWidget {
  final Function onchanged;
  final List<Room> receivedRooms;
  ClassroomsDropDown(this.onchanged, this.receivedRooms) : super();

  final String title = "ClassroomsDropDown";

  @override
  ClassroomsDropDownState createState() => ClassroomsDropDownState();
}

class ClassroomsDropDownState extends State<ClassroomsDropDown> {
  //
  List<Room> _rooms;
  List<DropdownMenuItem<Room>> _dropdownMenuItems;
  Room _selectedRoom;

  @override
  void initState() {
    _rooms = widget.receivedRooms;
    _dropdownMenuItems = buildDropdownMenuItems(_rooms);
    // _selectedRoom = _dropdownMenuItems[0].value;
    super.initState();
  }

  List<DropdownMenuItem<Room>> buildDropdownMenuItems(List rooms) {
    List<DropdownMenuItem<Room>> items = [];
    for (Room room in rooms) {
      items.add(
        DropdownMenuItem(
          value: room,
          child: Text(room.name),
        ),
      );
    }
    return items;
  }

  onChangeDropdownItem(Room selectedRoom) {
    setState(() {
      _selectedRoom = selectedRoom;
      widget.onchanged(selectedRoom);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 30,
      padding: EdgeInsets.symmetric(horizontal: 15),
      decoration: BoxDecoration(
        color: Theme.of(context).primaryColorLight,
        borderRadius: BorderRadius.all(Radius.circular(10)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          const Text("Trocar:"),
          const SizedBox(width: 10),
          DropdownButton(
            value: _selectedRoom,
            items: _dropdownMenuItems,
            onChanged: onChangeDropdownItem,
          ),
          // Text('Selected: ${_selectedRoom.name}'),
        ],
      ),
    );
  }
}
