import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import random_RGB from "../../gen/random_RGB";
import "./index.css";

class Graphs extends Component {
  constructor(props) {
    super(props);
    var color = [];
    for (var i = 0; i < 3; i++) {
      color.push(random_RGB());
    }

    this.state = {
      chartData: {
        labels: ["Alocação 1", "Alocação 2", "Alocação 3"],
        datasets: [
          {
            label: "% de ocupação",
            data: [21.57047619047618, 30.56714285714288, 23.206190476190475],
            backgroundColor: [color[0][0], color[1][0], color[2][0]],
            borderColor: [color[0][1], color[1][1], color[2][1]],
            borderWidth: 1,
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className="chart">
        <h4>Grafico de Alocação</h4>
        <Bar
          data={this.state.chartData}
          options={{ maintainAspectRatio: true }}
        />
      </div>
    );
  }
}

export default Graphs;
