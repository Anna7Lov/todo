import { createStore } from 'redux';
import { rootReducer } from './rootReducer';

export const store = createStore(rootReducer);

store.subscribe(() => console.log('state: ', store.getState()));
