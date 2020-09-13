import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const SelectPayment = ({route, navigation}) => {
  const {cost} = route.params;
  const {type} = route.params;
  const {pick} = route.params;
  const {drop} = route.params;
  const {discription} = route.params;
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: '87%',
            marginLeft: 25,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 23, fontWeight: 'bold'}}>
            Booking Summary!
          </Text>
        </View>
        <View
          style={{
            marginTop: 120,
            backgroundColor: '#f8f9fa',
            justifyContent: 'center',
            marginLeft: 25,
            marginRight: 25,
            padding: 10,
            elevation: 6,
            borderRadius: 20,
            paddingLeft: 20,
          }}>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Car Type :</Text>
            <Text style={styles.sumText}>{type}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Pick Up :</Text>
            <Text style={styles.sumText}>{pick}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Drop Off : </Text>
            <Text style={styles.sumText}>{drop}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Discription :</Text>
            <Text style={styles.sumText}>{discription}</Text>
          </View>
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Cost :</Text>
            <Text style={styles.sumText}>{cost}</Text>
          </View>
        </View>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={styles.buttonConatainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 256,
          }}>
          <Text style={{fontWeight: '700', fontSize: 24, color: '#3E4958'}}>
            Select Payment
          </Text>
        </View>
        <Animatable.View
          animation="fadeInRightBig"
          duration={2500}
          style={styles.cardPay}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('Payments')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row-reverse',
              }}>
              <MaterialIcons name="navigate-next" color="#97ADB6" size={20} />
              <Text
                style={{
                  color: '#011627',
                  fontWeight: '400',
                  fontSize: 20,
                  marginRight: 120,
                }}>
                Card
              </Text>
              <MaterialIcons
                style={{marginLeft: 40}}
                name="credit-card"
                color="#97ADB6"
                size={20}
              />
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="fadeInLeftBig"
          duration={2500}
          style={styles.cash}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row-reverse',
            }}>
            <MaterialIcons name="navigate-next" color="#97ADB6" size={20} />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 20,
                marginRight: 120,
                color: '#3E4958',
              }}>
              Cash
            </Text>
            <FontAwesome
              style={{marginLeft: 40}}
              name="money"
              color="#97ADB6"
              size={20}
            />
          </View>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={2500}
          style={styles.payPal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row-reverse',
            }}>
            <MaterialIcons name="navigate-next" color="#97ADB6" size={20} />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 20,
                marginRight: 120,
                color: '#3E4958',
              }}>
              PayPal
            </Text>
            <FontAwesome
              style={{marginLeft: 40}}
              name="paypal"
              color="#97ADB6"
              size={20}
            />
          </View>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    cards: state.addCard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (value) => dispatch(updateCard(value)),
  };
};

export default SelectPayment;

const styles = StyleSheet.create({
  buttonConatainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    backgroundColor: '#fdfffc',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
    marginTop: height / 1.7,
  },
  cardPay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginTop: 62,
    marginBottom: 184,
    marginLeft: 21,
    marginRight: 21,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    borderColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  cash: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginTop: 132,
    marginBottom: 115,
    marginLeft: 21,
    marginRight: 21,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    borderColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  payPal: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    marginTop: 198,
    marginBottom: 115,
    marginLeft: 21,
    marginRight: 21,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    borderColor: '#fff',
    elevation: 4,
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  summaryText: {
    padding: 10,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 30,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:10
  },
  sumText: {fontSize: 12, fontWeight: '700'},
});
