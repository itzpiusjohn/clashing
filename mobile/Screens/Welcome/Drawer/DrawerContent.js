import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Drawer,
  TouchableRipple,
  Switch,
  Text,
  Caption,
} from 'react-native-paper';

export function DrawerContent(props) {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flex: 1,
            marginBottom: 560,
            backgroundColor: '#1152FD',
            width: 312,
            height: 234,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableRipple onPress={() => props.navigation.navigate('Profile')}>
            <View
              style={{
                marginLeft: 52,
                marginRight: 180,
                marginTop: 90,
                marginBottom: 90,
              }}>
              <Avatar.Image
                backgroundColor="#fff"
                source={require('../../../asset/user.png')}
                size={50}
              />
              <Title style={{color: '#fff', paddingTop: 10, paddingLeft: 5}}>
                User
              </Title>
              <Caption style={{color: '#fff', paddingLeft: 5}}>
                @itzUser
              </Caption>
            </View>
          </TouchableRipple>
        </View>
        <TouchableRipple style={{flex: 1, position: 'absolute'}}>
          <View style={styles.textStyle}>
            <Text style={{fontWeight: 'bold', fontSize: 13, color: '#3E4958'}}>
              {' '}
              RIDE HISTORY
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                paddingTop: 50,
                color: '#3E4958',
              }}>
              PAYMENTS
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                paddingTop: 50,
                color: '#3E4958',
              }}>
              PROMO CODE
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 13,
                paddingTop: 50,
                color: '#3E4958',
              }}>
              SUPPORT
            </Text>
          </View>
        </TouchableRipple>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#fff',
  },
  textStyle: {
    flex: 2,
    position: 'absolute',
    marginTop: 339,
    marginBottom: 457,
    marginRight: 110,
    marginLeft: 51,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
});
