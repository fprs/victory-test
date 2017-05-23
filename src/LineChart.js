// trzeba ustandaryzować sposób przekazywania danych do wykresu, żeby było to sensowne od wejścia, czyli siatka punktów czy coś

import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryContainer,
  VictoryBrushContainer,
} from 'victory';
import _ from 'lodash';
import moment from 'moment';

const colors = ['#f46c60', '#459fb6', '#78e57a', '#fbba00', '#3acdff'];

const strokeDasharray = '10, 5';
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

const getData = () =>
  [
    moment('2017-02-20 01:00').valueOf(),
    moment('2017-02-21 01:00').valueOf(),
    moment('2017-02-22 01:00').valueOf(),
    moment('2017-02-23 01:00').valueOf(),
    moment('2017-02-24 01:00').valueOf(),
    moment('2017-02-25 01:00').valueOf(),
    moment('2017-02-26 01:00').valueOf(),
    moment('2017-02-27 01:00').valueOf(),
    moment('2017-02-28 01:00').valueOf(),
  ].map(d => ({
    from: d,
    stats: [
      _.random(0, 50, 10),
      _.random(0, 100, 10),
      _.random(0, 30, 10),
      _.random(0, 70, 10),
      _.random(0, 20, 10),
    ],
  }));

export default class LineChart extends React.Component {
  constructor() {
    super();

    this.state = { data: getData(), lineChart: true };
    this.setData = this.setData.bind(this);
    this.toggleComponent = this.toggleComponent.bind(this);
  }

  getChartProps(i) {
    return {
      data: this.state.data.map(d => ({ x: d.from, y: d.stats[i] })),
      style: {
        data: {
          stroke: colors[i],
          fill: this.state.lineChart ? 'none' : colors[i],
        },
      },
      animate: {
        duration: 500,
        onLoad: {
          duration: 1000,
        },
      },
    };
  }

  setData() {
    this.setState({ ...this.state, data: getData() });
    console.log(this.state.data);
  }

  toggleComponent() {
    this.setState({ ...this.state, lineChart: !this.state.lineChart });
  }

  render() {
    return (
      <div>
        <button onClick={this.setData}>get new data</button>
        <button onClick={this.toggleComponent}>change chart type</button>
        <VictoryChart
          containerComponent={
            <VictoryVoronoiContainer
              labels={d => `y: ${d.y}`}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: 'white' }}
                />
              }
            />
          }
          scale={{ x: 'time' }}
        >
          <VictoryAxis
            style={{
              tickLabels: { fontSize: 8 },
              grid: { stroke: 'gray' },
            }}
            tickCount={6}
            crossAxis={true}
            animate={{
              duration: 500,
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 8 },
              grid: { stroke: 'gray' },
            }}
            tickCount={6}
            crossAxis={true}
            animate={{
              duration: 500,
            }}
          />
          {[1, 2, 3, 4, 5].map(
            (a, i) =>
              (this.state.lineChart
                ? <VictoryLine {...this.getChartProps(i)} />
                : <VictoryBar {...this.getChartProps(i)} />),
          )}
        </VictoryChart>
      </div>
    );
  }
}
