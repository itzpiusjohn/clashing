import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class BookingScreen extends Component {
  static navigationOptions = {
    title: 'BookingScreen',
    headerStyle: {
      backgroundColor: '#73C6B6',
    },
  };
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
