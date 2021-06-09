class Cenario {
  int id;
  String name;

  Cenario(this.id, this.name);

  static List<Cenario> getCenarios() {
    return <Cenario>[
      Cenario(1, 'Cenario 1'),
      Cenario(2, 'Cenario 2'),
    ];
  }
}
