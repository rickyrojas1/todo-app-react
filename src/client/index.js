import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';

import './stylesheets/style.scss';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('main'));
});
