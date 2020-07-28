import React, { Component } from 'react'
import { StyleSheet, View, StatusBar ,Image,Dimensions, Text, Button} from 'react-native';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('window');
export default class IntroSlider extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style = {styles.container}>
                <StatusBar hidden = {true}/>
               <Swiper autoplay={true}>
                   <View style= {styles.slide}>
                       <Image
                       source = {require('../../asset/welcome1.jpg')}
                       style={styles.image}
                       />
                    </View>
                   <View style= {styles.slide}>
                       <Image
                       source = {require('../../asset/welcome.jpg')}
                       style={styles.image}
                       />
                   </View>
                   <View style= {styles.slide}>
                       <Image
                       source = {require('../../asset/welcome2.jpg')}
                       style={styles.image}
                       />
                   </View>
               </Swiper>
               <View style= {styles.textContainer}>
                   <View style={styles.titleContainer}>
                       <Text style={styles.title}> Welcome to the ask taxi app </Text>
                   </View>
                   <View style={styles.subTitleContainer}>
                        <Text style={styles.subTitle}>we make your taxi wish come true</Text>
                   </View>
                           
               </View>
               <View style={styles.buttonContainer}>
                   
                   <View style= {styles.signInContainer}>
                          <Text style={styles.signIn}>Sign In</Text>
                      </View>
                      <View  style = {styles.signUpContainer}>
                          <Text style= {styles.signUp}>Sign up</Text>
                      </View>
                      
                  </View>      
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }, 
    slide:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    image:{
        width: width,
        height:height
    },
    textContainer:{
        position:'absolute',
        bottom:200,
        marginLeft:20,
        height:120,
        alignItems:'flex-start',
        justifyContent:'center',
        
    },
    titleContainer:{
        width:300,
        height:70,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50
    },
    title:{
        fontFamily:'Helvetica',
        fontSize:20,
        color:'#fff'
    },
    subTitleContainer:{
        width: 200,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    subTitle:{
        fontFamily:'Helvetica',
        fontSize:18,
        color:'#fff'
    },
    buttonContainer:{
         position:'absolute',
         flexDirection:'row',
         bottom:70,
         width:350,
         height: 60,
         marginLeft:10,
         alignItems:'flex-start',
         justifyContent:'space-between'
    },
    signInContainer:{
        width:150,
        height:40,
        backgroundColor:'#1152FD',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fff',
        borderWidth:2,
        opacity:0.7

    },
    signIn:{
        fontFamily:'Helvetica',
        fontWeight:'bold',
        fontSize:20,
        color:'#fff'
    },
    signUpContainer:{
        width:150,
        height:40,
        backgroundColor:'#1152FD',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fff',
        borderWidth:2,
        opacity:0.7
    },
    signUp:{
        fontFamily:'Helvetica',
        fontWeight:'bold',
        fontSize:16,
        color:'#fff'
    }
})
