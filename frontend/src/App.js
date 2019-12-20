import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './layout/MainPage';

/**
 * Load the main page component
 */
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainPage/>
      </Provider>
    </div>
  );
}

export default App;
