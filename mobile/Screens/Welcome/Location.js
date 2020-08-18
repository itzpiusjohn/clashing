navigator.geolocation = require('@react-native-community/geolocation');
import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Keyboard,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import {
  InputGroup,
  Input,
  Left,
  List,
  ListItem,
  Body,
  Button,
} from 'native-base';
import placesApi from './apiKey';
import PolyLine from '@mapbox/polyline';
import Icon from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
const mapStyle = require('./mapstyles.json');
let pickId;
let dropId;
const {height, width} = Dimensions.get('window');
import fareCalculator from '../../Utill/fareCalculator';
import FabStyles from './FabStyles';
import CarSelect from './Components/CarSelect';
import Ionicons from 'react-native-vector-icons'

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
      //draws a polyline in the map
      const points = PolyLine.decode(json.routes[0].overview_polyline.points);
      let pointChords = points.map((point) => {
        return {latitude: point[0], longitude: point[1]};
      });
      this.setState({
        pointChords: pointChords,
        predictions: [],
      });

      Keyboard.dismiss();
      this.map.fitToCoordinates(pointChords);
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
        timeValue:json.rows[0].elements[0].duration.text,
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
      this.setState({isUpdate: true, predictions:[]});
      this.getDistanceCalculations(pickId, dropId);
    }
  }
  // getSelectedRideType(){
  //   this.setState({
  //       isSelect: !this.state,
  //   })
  // }

  render() {
    const {navigation} = this.props;
    const continueHandler = () => {
      console.log('yes!');
      return this.props.navigation.navigate('Booking');
    };
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
    let marker = null;
    if (this.state.pointChords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointChords[this.state.pointChords.length - 1]}
        />
      );
    }
    let iconBack = null;
    if(this.state.isUpdate){
      iconBack = (
        <View style={{
          position:"absolute",
          marginLeft:28,
          marginRight:339,
          marginTop:38,
          marginBottom:759
        }}>
          <Ionicons name = 'chevron-back-circle' color = '#ccc'/>
          </View>
      )
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
          {marker}
          <Polyline
            coordinates={this.state.pointChords}
            strokeWidth={3}
            strokeColor="#1152fd"
          />
        </MapView>
        {!this.state.isUpdate ? 
        <View style={styles.main}>
          <Animatable.View animation="fadeInUpBig">
            <View style={styles.card}>
              <InputGroup>
                <Icon
                  style={{paddingLeft: 10}}
                  name="search"
                  size={19}
                  color="#64b5f6"
                />
                <Input
                  style={styles.textInput}
                  placeholder="Pick up location"
                  id="pickUp"
                  value={this.state.pickUp}
                  onChangeText={(desPick) => this.onChangePickUp(desPick)}
                />
              </InputGroup>
              <InputGroup>
                <Icon
                  style={{paddingLeft: 10}}
                  name="search"
                  size={19}
                  color="#64b5f6"
                />
                <Input
                  style={styles._textInput}
                  placeholder="Drop off location"
                  id="dropOff"
                  value={this.state.dropOff}
                  onChangeText={(desDrop) => this.onChangeDropOff(desDrop)}
                />
              </InputGroup>
            </View>
          </Animatable.View>
        </View>
        : null}
        {(this.state.pickUp || this.state.dropOff) && this.state.predictions ? (
          <View  style={styles.footer}>
            <List
              dataArray={predictions}
              key={(item) => item.id}
              keyExtractor={(item) => item.id}
              renderRow={(item) => (
                <ScrollView>
                  <ListItem
                    button
                    avatar
                    onPress={() =>
                      this.getSelectedValues(
                        item.place_id,
                        item.structured_formatting.main_text,
                      )
                    }>
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
                  </ListItem>
                </ScrollView>
              )}
            />
          </View>
        ) : null}
       {this.state.isUpdate ? (
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
                justifyContent: 'center',
                marginRight: 21,
                marginLeft: 51,
                marginBottom: 11,
              }}>
              <Button
                style={FabStyles.fabContainer}
                onPress={() => continueHandler}>
                <Text style={FabStyles.btnText}>Book</Text>
              </Button>
            </View>
          </View>
        )
        : null} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: width,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 240,
    marginTop: 2,
    position: 'absolute',
  },
  textInput: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    color: '#05375a',
    borderColor: '#CFD1D5',
    borderBottomWidth: 1,
    height: 30,
    fontSize: 10,
    fontWeight: 'bold',
  },
  _textInput: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 5,
    paddingTop: 10,
    color: '#05375a',
    height: 30,
    fontSize: 10,
    fontWeight: 'bold',
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
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
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
    top: 50,
    position: 'absolute',
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
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
    position: 'relative',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 390,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 2,
    marginTop: 442,
    paddingBottom: 50,
  },
  estimate: {
    marginLeft: 40,
    marginRight: 180,
    marginBottom: 118,
    marginTop: 240,
    position: 'absolute',
    width: 149,
    height: 37,
    borderWidth: 0.2,
    borderColor: '#ccc',
    fontWeight:'normal',
    color:'#97ADB6'
  },
});
