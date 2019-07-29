import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <div className="App">
    <App
      default={[
        6, 11, 10, 2,
        12, 7, 5, 9,
        14, 0, 13, 3,
        4, 8, 15, 1
      ]}
      res={[
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 0
      ]}
      width={4} height={4}
      x={1} y={2}
    />
  </div>,
  document.getElementById('root')
);
