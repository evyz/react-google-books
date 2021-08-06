import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Store from './store'

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    store: new Store()
  }}>
    <App />
  </Context.Provider>
  ,
  document.getElementById('root')
);
