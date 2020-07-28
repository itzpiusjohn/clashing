import React from 'react'
import { Text, StyleSheet, View ,Button, Dimensions, Image, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable'; 


const SplashScren = ({navigation}) =>{
   
    return(
        <View style={styles.container}>
          <StatusBar backgroundColor='#64b5f6' barStyle='light-content'/>
           <View style={styles.header}>
              <Animatable.Image
              animation="bounceIn"
              duration={1500}
              source={require('../../asset/splash.png')}
              style={styles.logo}
              resizeMode="stretch"
              />


           </View>
           <Animatable.View style={styles.footer} animation="fadeInUpBig">
               <Text style={styles.title}>Book a cab with us</Text>
               <Text style={styles.text}>Share with friends!</Text>
               <View style={styles.button}>
                <TouchableOpacity onPress={()=> navigation.navigate('SignInScreen')}>
                <LinearGradient
                  colors={["#0d47a1","#64b5f6" ]}
                  style={styles.signIn}
                 >

                 <Text style={styles.textSign}>Continue</Text>
                 <MaterialIcons 
                  name="navigate-next"
                  color="#fff"
                  size={20}
                 />
                 </LinearGradient>


               </TouchableOpacity>

               </View>
              
           </Animatable.View>
        </View>
    )
}

export default SplashScren;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d47a1',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 100,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
