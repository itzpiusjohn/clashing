import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const  PaymentsMethods = () => {
        return (
            <View style={{flex:1, backgroundColor:'#fff', flexDirection:'row'}}>
               <View style={styles.box}>
                   <Text>Credit Card</Text>
               </View>
            </View>
        )
}

export default PaymentsMethods;

const styles = StyleSheet.create({
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
       
      },
      box2:{
        position: 'absolute',
        height: 145,
        width: 149,
        top: 0,
        left: 0,
        marginTop: 323,
        marginBottom: 344,
        marginLeft: 181,
        marginRight: 15,
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
       
      }
})
