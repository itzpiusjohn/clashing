import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Location from './Location';
import SelectPayment from './SelectPayment';
import {
  Support,
  Promocode,
  Signout,
} from './Drawer/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from './Drawer/DrawerContent';
import Profile from './Profile';
import Booking from'./Booking';
import Payments from '../Welcome/Components/Payments';
import PaymentsMethods from '../Welcome/Components/PaymentsMethods';


const RootStack = createStackNavigator();

const Drawer = createDrawerNavigator();
const RootStackScreen = ({navigation}) => (
  <Drawer.Navigator initialRouteName="Home" drawerContent = {props => <DrawerContent {...props}/>}>
    <Drawer.Screen name="Home" component={Location}/>
    <Drawer.Screen name="Profile" component={Profile}/>
    <Drawer.Screen name="Payments" component={Payments}/>
    <Drawer.Screen name="Promocode" component={Promocode} />
    <Drawer.Screen name="Sign-out" component={Signout}/>
    <Drawer.Screen name="Support" component={Support}/>
    <Drawer.Screen name="Booking" component={Booking}/>
    <Drawer.Screen name="SelectPayment" component={SelectPayment}/>
    <Drawer.Screen name = "PaymentMethods" component={PaymentsMethods}/>
  </Drawer.Navigator>
);

// const MainStackScreen = ({navigation}) =>  (
//  <RootStack.Navigator headerMode='none'>
//     <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
//     <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
//     <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
//     <RootStack.Screen name='Home' component={Location}/>
//     <RootStack.Screen name="BookingScreen" component = {BookingScreen}/>
// </RootStack.Navigator> 
// )

export default RootStackScreen;
