import React from 'react';
import {View, Text, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
export default function noData() {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginTop: height * 0.5,
        width: width,
      }}>
      <Text
        style={{
          textAlign: 'center',
          padding: 5,
          fontSize: 20,
          fontWeight: 'bold',
          backgroundColor: '#eee',
        }}>
        Click on "+" to add record
      </Text>
    </View>
  );
}
