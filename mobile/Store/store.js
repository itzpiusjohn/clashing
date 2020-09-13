import {createStore, combineReducers} from 'redux';
import creditCard  from './reducers/cardReducer';


const rootReducer = combineReducers({
  addCard: creditCard
})

const configureStore = () => createStore(rootReducer);

export default configureStore;

