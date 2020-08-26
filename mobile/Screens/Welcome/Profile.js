import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Text, Title, Caption} from 'react-native-paper';

const Profile = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.avatar}>
        <Avatar.Image
          backgroundColor="#ddd"
          source={require('../../asset/user.png')}
          size={50}
        />
        <Title style={{paddingLeft:10, paddingTop:10, fontWeight:'800', fontSize:20,width:184}}>
          User
        </Title>
        <Caption style={{paddingLeft:10,paddingTop:-10}}>@user</Caption>
      </View>
    </View>
  );
};

export default Profile;
const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    position: 'absolute',
    marginLeft: 146,
    marginRight: 145,
    marginTop: 110,
    marginBottom: 622,
    left: 0,
    top: 0,
    height:80,
    width:80
  },
});
