import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';

export default () => (
  <div 
    style={{ width: 400, height: 400, border: '1px solid grey' }}
    >
    <VictoryChart
      containerComponent={
        <VictoryVoronoiContainer dimension="x" labels={d => `y: ${d.y}`} />
      }
    >
      <VictoryLine />
      <VictoryBar />
    </VictoryChart>
  </div>
);
