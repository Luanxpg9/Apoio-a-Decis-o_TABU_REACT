import React, { Component } from "react";
import "./index.css";
import { Bar, Line, Pie } from "react-chartjs-2";

class Graphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          "Didatica 1",
          "Didatica 2",
          "Didatica 3",
          "Didatica 4",
          "Didatica 5",
          "Didatica 6",
        ],
        datasets: [
          {
            label: "% de ocupação",
            data: [50, 66, 40, 70, 100, 92],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    );
  }
}

export default Graphs;
