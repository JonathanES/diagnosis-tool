import { combineReducers } from 'redux';

import diagnosis from './diagnosis';
import symptom from './symptom';

const reducers = combineReducers({
  diagnosis, symptom
});

export default reducers;