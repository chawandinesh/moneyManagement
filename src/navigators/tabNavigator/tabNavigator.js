import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllRecords from '../../screens/AllRecords';
import Expenditures from '../../screens/Expenditures';
import Income from '../../screens/Income';

export default function MyTabs() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: '#60BABC',
      }}>
      <Tab.Screen
        name="Expenditure"
        children={(props) => <Expenditures {...props} />}
        options={{
          tabBarIcon: ({}) => {
            return (
              <Image
                source={require('../../assets/images/expenditure.png')}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Income"
        children={(props) => <Income {...props} />}
        options={{
          tabBarIcon: ({}) => {
            return (
              <Image
                source={require('../../assets/images/income1.png')}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="AllRecords"
        children={(props) => <AllRecords {...props} />}
        options={{
          tabBarIcon: ({}) => {
            return (
              <Image
                source={require('../../assets/images/allmoney.png')}
                style={{
                  height: 30,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
