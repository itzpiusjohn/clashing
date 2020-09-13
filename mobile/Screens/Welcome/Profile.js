import React, {Component} from 'react';
import {StyleSheet, View, TouchableHighlight, StatusBar} from 'react-native';
import {Avatar, Text, Title, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({navigation}) => {
  let upDate = false;
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#64b5f6" barStyle="light-content" />
      <View style={styles.avatar}>
        <Avatar.Image
          backgroundColor="#f4f4f4"
          source={require('../../asset/user.png')}
          size={50}
        />
        <Title
          style={{
            paddingLeft: 10,
            paddingTop: 10,
            fontWeight: '800',
            fontSize: 20,
            width: 184,
          }}>
          User
        </Title>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '400',
            marginLeft: 12,
            color: '#333',
          }}>
          info
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.icon}>
          <Icon name="history" size={26} color="#1152FD" />
        </View>
        <Text style={{fontWeight: '700'}}>History</Text>
      </View>
      <TouchableHighlight
         onPress={() => navigation.navigate('Payments')}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginTop: 323,
          marginBottom: 344,
          marginLeft: 200,
          marginRight: 15,
        }}>
        <View style={styles.payment}>
          <View style={styles.icon}>
            <Icon name="payment" size={26} color="#1152FD" />
          </View>
          <Text style={{fontWeight: '700'}}>Payment Methods</Text>
        </View>
      </TouchableHighlight>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          margintop: 474,
          marginBottom: 173,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 160,
          marginRight: 120,
          height: 40,
          width: 40,
        }}>
        <View
          style={{
            borderWidth: 1.5,
            borderColor: '#f4f4f4',
            borderRadius: 10,
          }}>
          <Icon name="settings" size={26} color="#1152FD" />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          margintop: 707,
          marginBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 155,
          height: 40,
          width: 40,
          borderRadius: 20,
          borderWidth: 1.5,
          borderColor: '#fff',
          marginRight: 120,
          elevation: 4,
          backgroundColor: '#fff',
        }}>
        <Icon
          onPress={() => navigation.navigate('Home')}
          name="close"
          size={30}
          color="#3E4958"
        />
      </View>
     
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  avatar: {
    marginLeft: 146,
    marginRight: 135,
    marginTop: 130,
    marginBottom: 622,
    height: 80,
    width: 80,
    justifyContent: 'center',
  },
  box: {
    position: 'absolute',
    height: 145,
    width: 149,
    top: 0,
    left: 0,
    marginTop: 323,
    marginBottom: 344,
    marginLeft: 15,
    marginRight: 181,
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: '#ccc',
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 4,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 53,
    marginRight: 50,
    marginTop: 40,
    marginBottom: 69,
  },
  payment: {
    height: 145,
    width: 149,
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    shadowColor: '#ccc',
    borderColor: '#fff',
    borderWidth: 2,
    elevation: 4,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
});
