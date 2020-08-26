import React from 'react';
import Navbar from './Navbar';

export const ProfileScreen = ({navigation}) => (
  <Navbar navigation={navigation} name="Profile" />
);
export const Payement = ({navigation}) => (
    <Navbar navigation={navigation} name="Payement" />
);


export const Promocode = ({navigation}) => (
    <Navbar navigation={navigation} name="Promocode" />
);

export const Support = ({navigation}) => (
    <Navbar navigation={navigation} name="Support" />
);
export const Signout = ({navigation}) => (
    <Navbar navigation={navigation} name="Sign-out" />
  );