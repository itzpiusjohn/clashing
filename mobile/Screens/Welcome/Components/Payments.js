import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {removeNonNumber} from 'react-native-credit-card-input/src/Utilities';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {addCard, updateCard} from '../../../Store/actions/cardActions';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardExpiry: '',
      cardNumber: null,
      exp: '',
      cvc: null,
      pin: null,
      name: '',
    };
  }
  handleChangeText(text) {
    let sanitizeText = removeNonNumber(text);
    if (sanitizeText.indexOf('.') >= 0 || sanitizeText.length > 5) {
      return;
    }
    if (sanitizeText.length === 2 && this.state.cardExpiry.length === 1) {
      sanitizeText += '/';
    }
    this.setState({
      cardExpiry: sanitizeText,
    });
  }
  handlingCardNumber(number) {
    const sanitize = removeNonNumber(number);
    this.setState({
      cardNumber: sanitize
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim(),
    });
  }
  //trying out a different logic
  handleChangeExp = (text) => {
    let textTemp = text;
    if (textTemp[0] !== '1' && textTemp[0] !== '0') {
      textTemp = '';
    }
    if (textTemp.length === 2) {
      if (
        parseInt(textTemp.substring(0, 2)) > 12 ||
        parseInt(textTemp.substring(0, 2)) == 0
      ) {
        textTemp = textTemp[0];
      } else if (this.state.exp.length === 1) {
        textTemp += '/';
      } else {
        textTemp = textTemp[0];
      }
    }
    this.setState({exp: textTemp});
  };
  handleAddCardSubmit = (cardNumber, pin, name, exp) => {
    this.props.dispatch({type: 'ADD_CARD', cardNumber, pin, name, exp});
    let e = this.props.dispatch;
    this.setState({
      cardNumber: null,
      name: '',
      exp: null,
      cvc: null,
      pin: null,
    });
  };
  handleChangeName = (e) => {
    this.setState({
      name: e,
    });
  };
  render() {
    //VARIABLE DECLARATIONS*********************************************************
    let {name, cvc} = '';
    let cardNumber = this.state.cardNumber;
    let expDate = this.state.exp;
    let pin = null;
    //******************************************************************************** */
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <View style={styles.parent}>
          <View style={styles.textHeader}>
            <Text style={{fontSize: 24, fontWeight: '700'}}>Add Card</Text>
          </View>
          <View style={styles.iconStyle}>
            <MaterialIcons
              onPress={() => this.props.navigation.goBack()}
              color="#4B545A"
              size={24}
              name="navigate-before"
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={4}
            behavior="padding"
            style={{
              flex: 2,
              flexDirection: 'column',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginRight: 25,
              marginLeft: 25,
              marginTop: 160,
            }}>
            <View
              style={{
                marginBottom: 10,
              }}>
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#3E4958',
                }}>
                CARD NUMBER
              </Text>
              <TextInput
                maxLength={19}
                onChangeText={(text) => this.handlingCardNumber(text)}
                value={this.state.cardNumber}
                placeholder="4354 XXXX XXXX XXXX"
                keyboardType="numeric"
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0.8,
                  borderColor: '#ddd',
                  height: 44,
                  borderRadius: 15,
                  backgroundColor: '#F7F8F9',
                  paddingLeft: 20,
                }}
              />
            </View>
            <View
              style={{
                marginBottom: 10,
                marginTop: 10,
              }}>
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#3E4958',
                }}>
                CARD HOLDER'S NAME
              </Text>
              <TextInput
                placeholder="eg. John Doe"
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0.8,
                  borderColor: '#ddd',
                  height: 44,
                  borderRadius: 15,
                  backgroundColor: '#F7F8F9',
                  paddingLeft: 20,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                marginRight: 45,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{marginRight: 60}}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#3E4958',
                    }}>
                    EXP DATE
                  </Text>
                  <TextInput
                    value={this.state.exp}
                    placeholder="eg. 01/16"
                    keyboardType="numeric"
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 0.8,
                      borderColor: '#ddd',
                      height: 44,
                      borderRadius: 15,
                      backgroundColor: '#F7F8F9',
                      paddingLeft: 20,
                      width: 105,
                    }}
                    onChangeText={(text) => this.handleChangeExp(text)}
                  />
                </View>
                <View style={{marginLeft: 35, marginRight: 25}}>
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#3E4958',
                    }}>
                    CVC
                  </Text>
                  <TextInput
                    keyboardType="number-pad"
                    maxLength={3}
                    value={this.state.cvc}
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 0.8,
                      borderColor: '#ddd',
                      height: 44,
                      borderRadius: 15,
                      backgroundColor: '#F7F8F9',
                      paddingLeft: 20,
                      width: 105,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 30,
                marginRight: 45,
              }}>
              <Text
                style={{
                  padding: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#3E4958',
                }}>
                CARD PIN
              </Text>
              <TextInput
                maxLength={4}
                secureTextEntry={true}
                keyboardType="number-pad"
                placeholder="****"
                style={{
                  backgroundColor: '#fff',
                  borderWidth: 0.8,
                  borderColor: '#ddd',
                  height: 44,
                  borderRadius: 15,
                  backgroundColor: '#F7F8F9',
                  paddingLeft: 20,
                  width: 129,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                marginTop: 505,
                marginBottom: 30,
              }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <View
                  style={{
                    marginRight: 130,
                    borderRadius: 10,
                    borderWidth: 2,
                    width: 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: '#f4f4f4',
                    height: 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      textDecorationLine: 'underline',
                    }}>
                    cancel
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.handleAddCardSubmit(
                    this.state.exp,
                    this.state.name,
                    this.state.cardNumber,
                    this.state.pin,
                  )
                }>
                <View
                  style={{
                    marginRight: 10,
                    backgroundColor: '#1152fd',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: '#fff',
                    elevation: 4,
                  }}>
                  <Text style={{color: '#FFF'}}>CONTINUE</Text>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     cards: state.addCard.Payments,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     update: (value) => dispatch(updateCard(value)),
//   };
// };

export default Payments;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  textHeader: {
    marginLeft: 69,
    marginRight: 69,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parent: {
    flexDirection: 'row-reverse',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 428,
  },
  iconStyle: {
    marginLeft: 18,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginRight: 21,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
