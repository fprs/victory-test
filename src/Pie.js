// slice i dataComponent do przeczytania i rozkminienia

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
    <VictoryPie
      data={[
        { month: 'September', profit: 35000, loss: 2000 },
        { month: 'October', profit: 42000, loss: 8000 },
        { month: 'November', profit: 55000, loss: 5000 },
      ]}
      x="month"
      y={datum => datum.profit - datum.loss}
      innerRadius={70}
      width={360}
      padding={50}
      events={[
        {
          target: 'data',
          eventKey: [0, 2, 4],
          eventHandlers: {
            onMouseOver: (e) => {
              return [
                {
                  mutation: props => {
                    console.log(props)
                    return {
                      style: { ...props.style, padding: props.padding + 10},
                      animate: {
                        duration: 2000,
                        onLoad: { duration: 1000 },
                        onEnter: { duration: 500, before: () => ({ y: 0 }) },
                      },
                    };
                  },
                },
                {
                  target: 'labels',
                  mutation: () => {
                    return { text: 'hey' };
                  },
                  callback: () => {
                    console.log('in');
                  },
                },
              ];
            },
            onMouseOut: () => {
              return [
                {
                  mutation: props => {
                    return {
                      animate: {
                        duration: 2000,
                        onLoad: { duration: 1000 },
                        onEnter: { duration: 500, before: () => ({ y: 0 }) },
                      },
                    };
                  },
                },
                {
                  target: 'labels',
                  mutation: datum => {
                    return null;
                  },
                  callback: () => {
                    console.log('out');
                  },
                },
              ];
            },
          },
        },
      ]}
    />
  </div>
);
