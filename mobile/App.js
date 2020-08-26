import React, {Component} from 'react';
import RootStack from './Screens/Welcome/RootStackScreen';
import {NavigationContainer} from '@react-navigation/native';
import Location from './Screens/Welcome/Location';
import RootStackScreen from './Screens/Welcome/RootStackScreen';
import {createStore, combineReducers} from 'redux';
import stateReducer from './Store/reducers/reducers';
import {Provider} from 'react-redux';


const rootReducer = combineReducers({
  access: stateReducer,
});
const store = createStore(rootReducer);



export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </Provider>
      // <Location/>
    );
  }
}
