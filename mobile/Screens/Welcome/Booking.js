import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');


export default class Booking extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.discriptio}>
          <View style={styles.carHolder}>
            <View style={styles.fleet}>
              <Image
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: 'center',
                  overflow: 'hidden',
                }}
                source={this.props.Image}
              />
            </View>
            <View style={styles.fleetText}>
              <Text
                style={{color: '#3E4958', fontSize: 15, textAlign: 'center'}}>
                {this.props.type}
              </Text>
            </View>
            <View style={styles.time}>
              <Text style={{color: '#FFF', fontSize: 15, fontWeight: '400'}}>
                {this.props.time}
              </Text>
            </View>
            <View style={styles.price}>
              <Text style={{color: '#3E4958', fontSize: 20}}>
                {this.props.price}.NGN
              </Text>
            </View>
          </View>
          <View style={styles.moreInfrm}>
            <Text style={{padding: 10, fontSize: 18, fontWeight: '600'}}>
              Location Discription
            </Text>
            <TextInput
              underlineColor="transparent"
              style={{
                height: 70,
                paddingTop: 10,
                backgroundColor: '#fff',
                borderWidth: 0.8,
                borderBottomRightRadius: 15,
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 10,
                borderColor: '#ddd',
              }}
              multiline={true}
              placeholder="more details about your destination..."
              onChangeText ={this.props.onChangeText}

            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.props.onPress}>
            <View style={styles.payments}>
              <Text>Continue To Payment</Text>
              <View
                style={styles.imageCan}>
                <Image source={require('../../asset/icon_mastercard.png')} />
                <Icons
                  style={{paddingHorizontal: 10}}
                  name="wallet"
                  color="blue"
                />
                <Icon name="paypal" style={{paddingRight: 10}} color="blue" />
                <Icon name="money" color="blue" />
              </View>
              <MaterialIcons name="navigate-next" color="blue" size={20} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0efeb',
  },
  carHolder: {
    height: 100,
    width: 333,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 10,
    backgroundColor: '#f8f9fa',
  },
  discriptio: {
    width: '100%',
    marginBottom:44,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f8f9fa',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  fleet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 90,
    height: 60,
    marginTop: 3,
    marginBottom: 37,
    marginLeft: 12,
    marginRight: 231,
  },
  fleetText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    width: 114,
    height: 20,
    marginTop: 70,
    marginBottom: 15,
    marginRight: 219,
    
  },
  time: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    marginTop: 59,
    marginBottom: 17,
    marginRight: 31,
    marginLeft: 251,
    borderRadius: 25,
  },
  price: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 30,
    left: 0,
    right: 0,
    marginTop: 17,
    marginBottom: 60,
    marginRight: 28,
    marginLeft: 215,
    borderRadius: 25,
  },
  payments: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: 333,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#4ba3c7',
    justifyContent: 'space-between',
    paddingLeft: 30,
    alignItems: 'center',
    borderRadius: 10,
  },
  custom: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    borderColor: '#fff',
    borderWidth: 0.2,
    right: 0,
    bottom: 0,
  },
  moreInfrm: {
    width: 333,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 10,
  },
  imageCan:{
    position: 'absolute',
    left: 0,
    right: '68%',
    top: 0,
    bottom: 0,
    width: 90,
    height: 24,
    borderRadius: 5,
    borderColor: '#fff',
    borderWidth: 0.5,
    marginRight: 110,
    marginLeft: 200,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 15,
    flex: 1,
    flexDirection: 'row',
  }
});
