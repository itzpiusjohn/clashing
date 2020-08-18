import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {CheckBox} from 'native-base';
export class CarSelect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
        onPress = {this.props.onPress}
          underlayColor="#ccc"
          style={{flex: 1, justifyContent: 'center'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flex: 2}}>
              <Image source={this.props.imageUri} style={styles.imageStyle} />
            </View>
            <View style={styles.holder}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  paddingBottom: 5,
                  marginLeft: 30,
                }}>
                {this.props.name}
              </Text>
              <View style={{flex: 1, paddingLeft: 30}}>
                <Text>Price:{this.props.price}</Text>
                <CheckBox
                  checked={this.props.checked}
                  onPress={this.props.onPress}
                  color="#1152FD"
                  style={{
                    marginLeft: 70,
                    marginBottom: 190,
                    borderRadius: 10,
                    marginRight: 90,
                    borderColor: '#ccc',
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 166,
    width: 150,
    marginLeft: 21,
    marginBottom: 190,
    marginTop: 27,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    borderWidth: 0.2,
    borderColor: '#ccc',
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'center',
    overflow: 'hidden',
  },
  holder: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    marginBottom: 30,
    elevation: 8,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
  },
});

export default CarSelect;
