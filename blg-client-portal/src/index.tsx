import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from "./store/StoreProvider"
import extractForm from './uitil/extractForm';
import type {ExtractedForm} from "./store/extractedFormReducer"

const extractedForm = extractForm() as ExtractedForm

document.title = process.env.REACT_APP_TITLE || 'Autologyx';

console.log("extractedForm", extractedForm)
const divEl = document.createElement('div')
divEl.setAttribute('id', 'client_portal')
const body = document.querySelector('body') as HTMLBodyElement 
body.textContent = ''

body.appendChild(divEl)

// Add icon
var link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
if (link === null) {
  link = document.createElement('link') as HTMLLinkElement;
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);
}

link.href = 'https://www.blg.com/-/media/blg/images/icons/favicon/favicon.ico';


const root = ReactDOM.createRoot(
  document.getElementById('client_portal') as HTMLElement
);
root.render(
    <StoreProvider>
      <App extractedForm={extractedForm} />
    </StoreProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
