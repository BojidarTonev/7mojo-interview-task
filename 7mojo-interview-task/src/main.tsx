import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from "./redux/store";
import {Provider} from "react-redux";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <ErrorBoundary>
              <App />
          </ErrorBoundary>
      </Provider>
  </React.StrictMode>,
)
