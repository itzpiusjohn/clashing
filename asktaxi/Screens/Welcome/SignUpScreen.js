import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
const {width, height} = Dimensions.get('window');
import axios from 'axios';
import baseUrl from './baseUrl';

axios.defaults.baseURL = baseUrl;


const SignUpScreen = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    mobile_number: '',
    check_textInputChange: false,
    new_text: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassWord: true,
    isValidPhone: true,
    isValidName: true,
    newErrorMsg:'',
    token:'',
    isErrorMessage: false,
  });
/**
 * handles the email inputs, check if email entry is valid.
 * @param {string} val 
 */
  const textInputChange = (val) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  /**
   * handles phone no. inputs check if entry is valid
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
   * Checks if password meets requirements.
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
  /**
   * Check for valid name entry.
   * @param {string} val 
   */
  const textNameChange = (val) => {
    if (val.trim().length >= 3) {
      setData({
        ...data,
        name: val,
        new_text: true,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        new_text: false,
        isValidName: false,
      });
    }
  };
/**
 *Handles the signUp onPress Action.
 * @param {string}
 */
   async function handleSignUp () {
    try {
     const {name , email, mobile_number, password} = data;
     const result = await axios.post("/users/register", {name,email,mobile_number,password})
     setData({ token: result.data.token})
     if(result.data.staus == 200){
      return navigation.navigate('UserLocationSelection')}
    } catch (error) {
      setData({...data, newErrorMsg: error.result.data.message, isErrorMessage: true});
    }
    setData({isErrorMessage: false});
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}>
      <ScrollView>
        <StatusBar backgroundColor="#64b5f6" barStyle="light-content" />
        <View style={styles.header}>
          <View style={styles.slide}>
            <Text style={styles.text_header}>Sign Up</Text>
          </View>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <View style={{marginTop: 35}}>
            <Text style={styles.text_footer}>NAME</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textNameChange(val)}
              value={data.name}
            />
          </View>
          <View style={{marginTop: 35}}>
            <Text style={styles.text_footer}>PHONE</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={(val) => phoneInputChange(val)}
              value={data.mobile_number}
            />
          </View>
          {data.isValidPhone ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                phone must be of the format +166900009875
              </Text>
            </Animatable.View>
          )}
          <View style={{marginTop: 35}}>
            <Text style={styles.text_footer}>EMAIL</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              value={data.email}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Email must of the format user@mail.com
              </Text>
            </Animatable.View>
          )}
          <View style={{marginTop: 35}}>
            <Text style={styles.text_footer}>PASSWORD</Text>
          </View>
          <View style={styles.action}>
            <TextInput
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleChangePassword(val)}
              value={data.password}
            />
            <View style={{position: 'absolute', paddingLeft: 320}}>
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="red" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be atleast 8 characters.
              </Text>
             
            </Animatable.View>
          )}
           {data.isErrorMessage ? (
          <Text style={styles.errorMsg}>{data.newErrorMsg.toString()}</Text>
        ) : null}
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: '#0d47a1',
                  borderWidth: 1,
                  marginTop: 50,
                },
              ]}
              onPress={handleSignUp}>
              <View style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}>Continue</Text>               
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[
                styles.signIn,
                {
                  borderColor: '#0d47a1',
                  borderWidth: 1,
                  marginTop: 25,
                },
              ]}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </TouchableOpacity>               
          </View>
        
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginBottom: 5,
    fontFamily: 'open-sans',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -12,
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
    color: '#05375a',
    borderRadius: 20,
    backgroundColor: '#F7F8F9',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
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
