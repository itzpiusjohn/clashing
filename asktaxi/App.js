import React from 'react';
import RootStackScreen from './Screens/Welcome/RootStackScreen';
import {NavigationContainer} from '@react-navigation/native';



const App = () =>{
  return(
    <NavigationContainer>
      <RootStackScreen/>
    </NavigationContainer>
  );
}
export default App;