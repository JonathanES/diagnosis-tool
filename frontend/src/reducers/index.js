import { combineReducers } from 'redux';

import diagnosis from './diagnosis';
import symptom from './symptom';
import report from './report';

const reducers = combineReducers({
  diagnosis, symptom, report
});

export default reducers;