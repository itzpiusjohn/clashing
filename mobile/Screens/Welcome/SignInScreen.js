import React, {useState, Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import baseUrl from './baseUrl';
axios.defaults.baseURL = baseUrl;

const {width, height} = Dimensions.get('window');
const SignInScreen = ({navigation}) => {

  const [data, setData] = useState({
    mobile_number: '',
    password: '',
    check_textInputChange: false,
    new_text: '',
    secureTextEntry: true,
    isValidPhone: true,
    isValidPassword: true,
    newErrorMsg: '',
    token: '',
    isErrorMessage: false,
    pressed: false
  });

  /**
   * Handles phone inputs,checks if phone inputs are valid
   * @param {string} val 
   */
  const phoneInputChange = (val) => {
    let re = /^\+([1-9]{1,3})([-. ]{1,})?([1-9]{1})?([0-9]{1,2})?([-. ]{1,})?([0-9]{1,3})([-. ]{1,})?([0-9]{4})$/;
    if (re.test(val)) {
      setData({
        ...data,
        mobile_number: val,
        new_text: true,
        isValidPhone: true,
      });
    } else {
      setData({
        ...data,
        mobile_number: val,
        new_text: false,
        isValidPhone: false,
      });
    }
  };

  /**
   * checks for validity of the password
   * @param {string} val 
   */
  const handleChangePassword = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        check_textInputChange: false,
        isValidPassword: false,
      });
    }
  };
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const resetState = () => {
  navigation.navigate('SignUpScreen')
  setData({
    isValidPassword: true,
    isValidUser: true,
    secureTextEntry:true
  })
  }
  /**
   * handles the onPress for sign in of users
   * @param  {string} val
   */
  async function handleSignIn({navigation}) {
    try {
      const {mobile_number, password} = data;
      const result = await axios.post('/auth/login', {mobile_number, password});
      setData({token: result.data.token});
      return navigation.navigate('UserLocationSelection');
    } catch (error) {
      setData({...data, newErrorMsg: error
        , isErrorMessage: true});
    }
    setData({isErrorMessage: false});
    if(data.pressed){
      setData({
        ...data,
        pressed: true
      })
    }
  }


  return (
    <View
      behavior="padding"
      keyboardVerticalOffset={40}
      style={styles.container}>
      <StatusBar backgroundColor="#64b5f6" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Sign In</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={styles.text_footer}>PHONE</Text>
        <View style={styles.action}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => phoneInputChange(val)}
            value={data.mobile_number}
            keyboardType="phone-pad"
            minLength={10}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidPhone ? null : (
          <View>
            <Text style={styles.errorMsg}>
              Phone number is not valid, please enter a valid phone
            </Text>
          </View>
        )}

        <Text style={styles.text_footer}>PASSWORD</Text>
        <View style={styles.action}>
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handleChangePassword(val)}
            value={data.password}
          />
          <View style={{position: 'absolute', right: 20}}>
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="red" size={20} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {data.isValidPassword  ?  null : (
          <View >
            <Text style={styles.errorMsg}>
              Password and email does not match, enter a valid password
            </Text>
          </View>
        )}
        {data.isErrorMessage ? (
          <Text style={styles.errorMsg}>{data.newErrorMsg.toString()}</Text>
        ) : null}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity = { .5 } 
            style={[
              styles.signIn,
              {
                borderColor: '#0d47a1',
                borderWidth: 1,
                marginTop: 30,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#fff'}]}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={resetState}
            style={[
              styles.signIn,
              {
                borderColor: '#0d47a1',
                borderWidth: 1,
                marginTop: 30,
              },
            ]}>
            <Text style={[styles.textSign, {color: '#fff'}]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent:'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom:100
  },
  text_header: {
    color: '#3F4A58',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginBottom: 10,
    marginTop:10,
    fontFamily: 'open-sans',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -12,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    color: '#05375a',
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
    marginBottom: 10,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom:10
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1152fd',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
