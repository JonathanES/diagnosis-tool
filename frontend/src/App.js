import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Symptom from './components/Symptom';
import Diagnosis from './components/Diagnosis';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Symptom/>
        <Diagnosis />
      </Provider>
    </div>
  );
}

export default App;
