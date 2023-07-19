import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './App.css';
import { store } from './services/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  ) as React.ReactNode
);
