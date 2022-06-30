import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';
import Login from './Login.js';

const getEmail = async (phoneNumber) =>{
  
}

const Home = () => {
  return (
    <View>
      <Bar loggedInUser="hellopandas720@gmail.com"/>
      <Icons />
    </View>
  );
};

export default Home;
