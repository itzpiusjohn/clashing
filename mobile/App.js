import React from 'react';
import RootStackScreen from './Screens/Welcome/RootStackScreen';
import {NavigationContainer} from '@react-navigation/native';
import Location from './Screens/Welcome/Location';


const App = () =>{
  return(
    // <NavigationContainer>
    //   <RootStackScreen/>
    // </NavigationContainer>
    <Location/>
  );
}
export default App;
  