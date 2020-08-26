navigator.geolocation = require('@react-native-community/geolocation');
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MapView, {Polyline, Marker, Callout} from 'react-native-maps';
import {
  InputGroup,
  Input,
  Left,
  List,
  ListItem,
  Body,
} from 'native-base';
import placesApi from './apiKey';
import PolyLine from '@mapbox/polyline';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
const mapStyle = require('./mapstyles.json');
import FabStyles from './FabStyles';
import CarSelect from './Components/CarSelect';

//variable declarations
let pickId;
let dropId;
const {height, width} = Dimensions.get('window');

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      error: null,
      dropOff: '',
      pickUp: '',
      predictions: [],
      pointChords: [],
      isPickUp: false,
      isDropOff: false,
      destination_IdPick: '',
      destinationPickUp: '',
      destinationDropOff: '',
      destination_IdDrop: '',
      isUpdate: false,
      baseFare: 0.4,
      timeRate: 0.14,
      distanceRate: 0.97,
      surge: 1,
      time: '',
      distance: '',
      isSelect: false,
      isSelect1: false,
      isSelect2: false,
      timeValue: '',
      lat: 0,
      long: 0,
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000},
    );
  }
  //directions api call
  async getRoutesDirection(desPick, desDrop) {
    try {
      const apiCall = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${desPick}&destination=place_id:${desDrop}&key=${placesApi}`;
      const response = await fetch(apiCall);
      const json = await response.json();
      console.log(json);
      //draws a polyline in the map
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      let lat = json.routes[0].legs[0].start_location.lat;
      let long = json.routes[0].legs[0].start_location.lng;
      let pointChords = points.map((point) => {
        return {latitude: point[0], longitude: point[1]};
      });
      this.setState({
        pointChords: pointChords,
        predictions: [],
        lat: lat,
        long: long,
      });

      Keyboard.dismiss();
      this.map.fitToSuppliedMarkers(['mk1', 'mk2']);
    } catch (err) {
      console.error(err);
    }
  }

  //Distance Matrix Calculations
  async getDistanceCalculations(origin, destination) {
    const dummyNumber = {
      baseFare: 0.4,
      timeRate: 0.14,
      distanceRate: 0.97,
      surge: 1,
    };
    const apiDistanceCall = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=place_id:${origin}&destinations=place_id:${destination}&key=${placesApi}`;
    const response = await fetch(apiDistanceCall);
    const json = await response.json();
    console.log(json);
    if (pickId && dropId) {
      this.setState({
        time: json.rows[0].elements[0].duration.value,
        distance: json.rows[0].elements[0].distance.value,
        timeValue: json.rows[0].elements[0].duration.text,
      });
    }
  }
  //method that send request for RNg places predictions
  async getPredictions(des) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${placesApi}&input=${des}&location=${this.state.latitude},${this.state.longitude}&radius=2000&country='NG'`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({predictions: json.predictions});
    } catch (erro) {
      console.log(error);
    }
  }
  onChangePickUp(desPick) {
    this.setState({
      pickUp: desPick,
      isPickUp: true,
      isDropOff: false,
    });
    this.getPredictions(this.state.pickUp);
  }
  onChangeDropOff(desDrop) {
    this.setState({
      dropOff: desDrop,
      isDropOff: true,
      isPickUp: false,
    });
    this.getPredictions(this.state.dropOff);
  }
  //selected values of prediction handler
  getSelectedValues(destinationPlaceId, destinationName) {
    if (this.state.isPickUp) {
      pickId = destinationPlaceId;
      this.setState({
        pickUp: destinationName,
        destination_IdPick: destinationPlaceId,
        predictions: [],
      });
    } else if (this.state.isDropOff) {
      dropId = destinationPlaceId;
      this.setState({
        dropOff: destinationName,
        destination_IdDrop: destinationPlaceId,
        predictions: [],
      });
    }
    if (pickId && dropId) {
      this.getRoutesDirection(pickId, dropId);
      this.getDistanceCalculations(pickId, dropId);
      this.setState({isUpdate: true, predictions: []});
    }
  }

  render() {
    let left = 268 / 2 + 5.25;
    let top = 133 / 2 - 115;
    const calculateFare = (
      baseFare,
      timeRate,
      time,
      distanceRate,
      distance,
      surge,
    ) => {
      const distanceInKm = distance * 0.001;
      const timeInMin = time * 0.0166667;
      const pricePerKm = timeRate * timeInMin;
      const pricePerMinute = distanceRate * distanceInKm;
      const totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
      return Math.round(totalFare);
    };
    let fare = calculateFare(
      this.state.baseFare,
      this.state.timeRate,
      this.state.time,
      this.state.distanceRate,
      this.state.distance,
      this.state.surge,
    );
    let marker1 = null;
    if (this.state.pointChords.length > 1) {
      marker1 = (
        <View
          style={{
            position: 'absolute',
            marginLeft: 59,
            marginRight: 49,
            marginBottom: 499,
            marginTop: 190,
            height: 133,
            width: 267,
          }}>
          <Marker
            coordinate={
              this.state.pointChords[this.state.pointChords.length - 1]
            }
            image={require('../../asset/ic_pick.png')}
            title={this.state.pickUp}
            identifier={'mk1'}
          />
          <Marker
            coordinate={{latitude: this.state.lat, longitude: this.state.long}}
            image={require('../../asset/flag.png')}
            title={this.state.dropOff}
            identifier={'mk2'}
          />
        </View>
      );
    }

    const predictions = this.state.predictions;
    return (
      <View style={styles.container} keyboardVerticalOffset={20}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          customMapStyle={mapStyle}
          ref={(ref) => {
            this.map = ref;
          }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.03425,
            longitudeDelta: 0.04983,
          }}>
          <View
            style={{
              marginLeft: 59,
              marginRight: 49,
              marginBottom: 454,
              marginTop: 225,
              width: 266.5,
              height: 133,
              left: left,
              top: top,
            }}>
            {marker1}
            <Polyline
              coordinates={this.state.pointChords}
              strokeWidth={3}
              strokeColor="#1152fd"
            />
          </View>
        </MapView>
        {this.state.isUpdate ? (
          <View
            style={{
              marginLeft: 40,
              marginRight: 327,
              marginTop: 30,
              marginBottom: 740,
              borderWidth: 0.2,
              borderColor: '#ccc',
              backgroundColor: '#fff',
              borderRadius: 15,
              height: 30,
              width: 30,
              paddingRight: 5,
              paddingLeft: 3,
              paddingTop: 3,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
            <Icon
              name="arrow-back"
              onPress={() => {
                pickId = null;
                dropId = null;
                this.setState({
                  isUpdate: false,
                  pickUp: '',
                  dropOff: '',
                  pointChords: [],
                  isSelect: false,
                  isSelect1: false,
                  isSelect2: false,
                });
              }}
              size={24}
            />
          </View>
        ) : (
          <View
            style={{
              marginLeft: 40,
              marginRight: 327,
              marginTop: 30,
              marginBottom: 740,
              borderWidth: 0.2,
              borderColor: '#ccc',
              backgroundColor: '#fff',
              borderRadius: 15,
              height: 30,
              width: 30,
              paddingRight: 5,
              paddingLeft: 3,
              paddingTop: 3,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
            <Icon
              name="menu"
              onPress={() => {
                this.props.navigation.openDrawer();
              }}
              size={24}
            />
          </View>
        )}
        {!this.state.isUpdate ? (
          <View style={styles.footer}>
            <View style={styles.main}>
              <View
                style={{
                  borderBottomColor: '#ddd',
                  borderBottomWidth: 1,
                  marginTop: 50,
                  marginBottom: 50,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  height: 0,
                }}
              />
              <InputGroup
                style={{
                  flex: 1,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginBottom: 40,
                  marginTop: 20,
                  marginLeft: 13,
                  marginRight: 71,
                }}
                borderColor="transparent">
                <Icon
                  style={{paddingLeft: 3, paddingTop: 10, paddingBottom: 5}}
                  name="search"
                  size={19}
                  color="#64b5f6"
                />
                <Input
                  style={styles.textInput}
                  placeholder="Enter your pick up location"
                  placeholderTextColor="#97ADB6"
                  id="pickUp"
                  value={this.state.pickUp}
                  onChangeText={(desPick) => this.onChangePickUp(desPick)}
                />
              </InputGroup>
              <InputGroup
                style={{
                  flex: 1,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  marginTop: 80,
                  marginLeft: 10,
                  marginRight: 70,
                  width: 212,
                  marginBottom: 5,
                }}
                borderColor="transparent">
                <Icon
                  style={{paddingLeft: 5, paddingBottom: 5, paddingTop: 20}}
                  name="search"
                  size={19}
                  color="#64b5f6"
                />
                <Input
                  style={styles._textInput}
                  placeholder="Enter your drop off location"
                  placeholderTextColor="#97ADB6"
                  id="dropOff"
                  value={this.state.dropOff}
                  onChangeText={(desDrop) => this.onChangeDropOff(desDrop)}
                />
              </InputGroup>
            </View>

            {(this.state.pickUp || this.state.dropOff) &&
            this.state.predictions ? (
              <View
                style={{
                  marginTop: 180,
                  marginLeft: 43,
                  marginRight: 66,
                  marginBottom: 20,
                }}>
                <List
                  dataArray={predictions}
                  key={(item) => item.id}
                  keyExtractor={(item) => item.id}
                  renderRow={(item) => (
                    <ListItem
                      button
                      avatar
                      onPress={() =>
                        this.getSelectedValues(
                          item.place_id,
                          item.structured_formatting.main_text,
                        )
                      }>
                      <View style={{width: width}}>
                        <Left style={styles.leftContainer}>
                          <Icon style={styles.leftIcon} name="location-on" />
                        </Left>
                        <Body>
                          <Text style={styles.primaryText}>
                            {item.structured_formatting.main_text}
                          </Text>
                          <Text style={styles.secondaryText}>
                            {item.description}
                          </Text>
                        </Body>
                      </View>
                    </ListItem>
                  )}
                />
              </View>
            ) : null}
          </View>
        ) : null}
        {this.state.isUpdate && this.state.pointChords.length > 1 ? (
        
            <View style={styles.buttonConatainer}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{
                  marginLeft: 21,
                  marginTop: 10,
                  marginRight: 21,
                  height: 250,
                }}
                horizontal={true}>
                <CarSelect
                  imageUri={require('../../asset/economy.jpeg')}
                  name="Economy"
                  onPress={() =>
                    this.setState({
                      isSelect: !this.state.isSelect,
                      isSelect1: false,
                      isSelect2: false,
                    })
                  }
                  checked={this.state.isSelect}
                  price={fare}
                />
                <CarSelect
                  imageUri={require('../../asset/VipClass.jpeg')}
                  name="Vip Ride"
                  price={fare}
                  checked={this.state.isSelect1}
                  onPress={() =>
                    this.setState({
                      isSelect1: !this.state.isSelect1,
                      isSelect: false,
                      isSelect2: false,
                    })
                  }
                />
                <CarSelect
                  imageUri={require('../../asset/vanRide.jpeg')}
                  name="Van"
                  price={fare}
                  checked={this.state.isSelect2}
                  onPress={() =>
                    this.setState({
                      isSelect2: !this.state.isSelect2,
                      isSelect: false,
                      isSelect1: false,
                    })
                  }
                />
              </ScrollView>
              <View style={styles.estimate}>
                <Text style={{fontSize: 13, alignItems: 'center'}}>
                  Estimated Time: {this.state.timeValue}
                </Text>
              </View>
              <View
                style={{
                  marginRight: 21,
                  marginLeft: 21,
                  marginBottom: 34,
                  marginTop: 219,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0,

                  position: 'absolute',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('BookingScreen')
                  }
                  activeOpacity={0.5}
                  style={[
                    styles.signIn,
                    {
                      borderColor: '#0d47a1',
                      borderWidth: 1,
                      marginTop: 30,
                    },
                  ]}>
                  <Text style={FabStyles.btnText}>Book</Text>
                </TouchableOpacity>
              </View>
            </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    width: '100%',
  },
  footer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderColor: '#ddd',
    borderWidth: 0.7,
    height: 662,
    backgroundColor: '#FFFFFF',
    width: width,
  },
  textInput: {
    paddingBottom: 5,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    height: 40,
    fontSize: 10,
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
    width: 220,
    marginLeft: 20,
    marginBottom: 10,
  },
  _textInput: {
    paddingBottom: 5,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
    height: 40,
    fontSize: 10,
    fontWeight: 'bold',
    width: 220,
    marginLeft: 20,
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    fontSize: 23,
    fontFamily: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
    position: 'absolute',
  },
  leftIcon: {
    fontSize: 20,
    color: '#64b5f6',
  },
  primaryText: {
    fontWeight: 'bold',
    color: '#373737',
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D',
  },
  main: {
    marginTop: 40,
    position: 'absolute',
    marginBottom: 522,
    marginRight: 21,
    marginLeft: 21,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  text_header: {
    color: '#3F4A58',
    fontWeight: 'bold',
    fontSize: 12,
    paddingBottom: 15,
    paddingTop: 10,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
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
  buttonConatainer: {
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
    marginTop: height/2, 
    marginBottom:60,
  },
  estimate: {
    position: 'absolute',
    left: 40,
    marginLeft: 40,
    marginRight: 180,
    marginBottom: 118,
    marginTop: 215,
    width: 160,
    height: 37,
    borderWidth: 0.2,
    borderColor: '#ccc',
    fontWeight: 'normal',
    color: '#97ADB6',
  },
});
