import React from 'react';
import { render } from 'react-dom';
import Pie from './Pie';
import Voronoi from './Voronoi';
import LineChart from './LineChart';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const App = () => (
  <div style={styles}>
    <LineChart />
  </div>
);

render(<App />, document.getElementById('root'));
