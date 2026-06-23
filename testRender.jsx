import React from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import App from './src/App.jsx';

const stream = renderToPipeableStream(React.createElement(App));
console.log('No error rendering App component');
