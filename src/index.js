import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import mobx from 'mobx';
import Remath from '../../remath';

var sheet = new Remath();
sheet.addCell('a', {formula: '3'});
sheet.addCell('b', {formula: '4'});
sheet.addCell('c', {formula: 'sqrt(a^2 + b^2)'});

sheet.onAlert((a) => {
  console.log(a.message);
});

ReactDOM.render(
    <App sheet={sheet} />,
    document.getElementById('root')
);

window.sheet = sheet; // for demo
