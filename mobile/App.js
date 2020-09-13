import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './Screens/Welcome/RootStackScreen';
import {Provider} from 'react-redux';
import configureStore from './Store/store';


const store = configureStore();
export default class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>  
      </Provider>
    );    
  }
}
