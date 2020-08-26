import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default class Navbar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{flex:1}}>
                    <TouchableOpacity style={{alignItems:'flex-end', margin: 16}}
                    onPress={this.props.navigation.openDrawer}
                    >
                        <Icon name="bars" style={{marginLeft:5,marginRight:290}} size={24} color="#161924"/>
                    </TouchableOpacity>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                         <Text style={styles.text}>{this.props.name} Screen</Text>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    text:{
        color: '#161924',
        fontSize:20,
        fontWeight:'500'
    }
})
