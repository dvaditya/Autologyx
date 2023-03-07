import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { extractForm } from './utils';

const formData = extractForm(); //process.env.NODE_ENV === 'development' ? {} : extractForm();

// Set the document title
document.title = process.env.REACT_APP_TITLE || 'Autologyx';

// Hide the form and append base divs.
let _body = document.querySelector('body');
let e = document.createElement('div');

_body.textContent = ''
e.innerHTML = '<div id="formbuilder2"></div><div id="modal"></div>';
while (e.firstChild) {
  _body.appendChild(e.firstChild);
}

// Add icon
var link = document.querySelector("link[rel~='icon']");
if (!link) {
  link = document.createElement('link');
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = 'https://www.blg.com/-/media/blg/images/icons/favicon/favicon.ico';

ReactDOM.render(
  <App formData={formData} />,
  document.getElementById('formbuilder2')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
