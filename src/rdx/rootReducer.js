import { combineReducers } from 'redux';
import { reducer as tasksReducer } from './tasks/reducer';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
