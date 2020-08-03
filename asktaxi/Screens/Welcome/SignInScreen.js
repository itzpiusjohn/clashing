import React,{useState} from 'react'
import { Text, StyleSheet, View ,Button, TouchableOpacity, Dimensions, Image,TextInput, StatusBar, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable'; 

const {width, height} = Dimensions.get('window');

const SignInScreen = ({navigation}) =>{
  const [data, setData] = useState({
    email:'',
    password:'',
    check_textInputChange:false,
    secureTextEntry:true,
    isValidUser: true,
    isValidPassword:true
  })
  const textInputChange = (val) =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(val)) {
      setData({
        ...data,
        email:val,
        check_textInputChange:true,
        isValidUser:true
      })
    }else{
      setData({
        ...data,
        email:val,
        check_textInputChange:false,
        isValidUser:false
      });
    }
  }

  const handleChangePassword = (val)=>{
    if(val.trim().length >= 8){
       setData({
      ...data,
      password:val,
      isValidPassword:true
    });
    }
    else{
      setData({
        ...data,
        password: val,
        check_textInputChange:false,
        isValidPassword:false
      })  
    }
   
  }
  const updateSecureTextEntry = () =>{   
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

    return(
        <View style={styles.container}>
          <StatusBar backgroundColor='#64b5f6' barStyle='light-content'/>
           <View style={styles.header}>
           <View style= {styles.slide}>
                       <Image
                       source = {require('../../asset/welcome1.jpg')}
                       style={styles.image}
                       />
                    </View>
           </View>
           <Animatable.View animation="fadeInUpBig" style={styles.footer}> 
             <Text style={styles.text_footer}>Email</Text>
             <View style={styles.action}>
               <FontAwesome
               name="user-o"
               color="#bbdefb"
               size={20}
               />
               <TextInput
               placeholder="Enter Your Mail"
               style={styles.textInput}
               autoCapitalize="none"
               onChangeText={(val)=> textInputChange(val)}
               />
               {data.check_textInputChange ? 
               <Animatable.View
               animation="bounceIn"
               >
                  <Feather
                name="check-circle"
                color="green"
                size={20}
               />
               </Animatable.View>
              
              :null}
             </View>
            {data.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
               <Text style= {styles.errorMsg}>Email must of the format user@mail.com</Text>
            </Animatable.View>
            }
            
             <Text style={styles.text_footer,{marginTop:35,fontWeight:'bold'}}>Password</Text>
             <View style={styles.action}>
               <Feather
               name="lock"
               color="#bbdefb"
               size={20}
               />
               <TextInput
               placeholder="Enter Your Password"
               secureTextEntry={data.secureTextEntry ? true: false}
               style={styles.textInput}
               autoCapitalize="none"
               onChangeText={(val)=> handleChangePassword(val)}
               />
               <TouchableOpacity onPress = {updateSecureTextEntry}>
                 {data.secureTextEntry?
                 <Feather
                name="eye-off"
                color="grey"
                size={20}
               />
               :
               <Feather
               name="eye"
               color="red"
               size={20}
              />
                 }
               </TouchableOpacity>
             </View>
             {data.isValidPassword ? null :
             <Animatable.View animation="fadeInLeft" duration={500}>
               <Text style= {styles.errorMsg}>Password does not match, enter a valid password</Text>
            </Animatable.View>
             }
             
             <View style={styles.button}>
              <LinearGradient
              colors = {["#0d47a1","#64b5f6"]}
              style = {styles.signIn}
              >
                <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>
              </LinearGradient>
              <TouchableOpacity
               onPress={()=> navigation.navigate('SignUpScreen')}
               style={[styles.signIn, {
                 borderColor:'#0d47a1',
                 borderWidth:1,
                 marginTop:15
               }]}
              >
                  <Text style={[styles.textSign, {color:"#64b5f6"}]}>Sign Up</Text>
              </TouchableOpacity>
             </View>
           </Animatable.View>
        </View>
    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0d47a1',
    },
    image:{height:height/2, width:width},
    header: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingBottom: 50,
    },
    footer: {
      flex: 2,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_header: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 30,
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
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
      marginTop: -12,
      paddingLeft: 10,
      color: '#05375a',
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
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    slide:{
      flex:1,
      justifyContent:"center",
      alignItems:'center'
    }
  });
