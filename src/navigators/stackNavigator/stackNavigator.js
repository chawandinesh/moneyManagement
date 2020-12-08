import React, {useState, useRef} from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Expenditures from '../../screens/Expenditures';
import {TouchableOpacity, Text, View} from 'react-native';
import TabNavigator from '../tabNavigator/tabNavigator';
import Income from '../../screens/Income';
import AllRecords from '../../screens/AllRecords';
import {store} from '../../redux/store/store';
import ExpenditureForm from '../../screens/DetailsForm';
import ShowRecordEntity from '../../screens/ShowRecordEntity';
import Feather from 'react-native-vector-icons/Feather';
import Popover, {PopoverPlacement} from 'react-native-popover-view';

export default function stackNavigator() {
  const [headerName, setHeaderName] = useState('MoneyManagement');
  const touchable = useRef();
  const [showPopover, setShowPopover] = useState(false);
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expenditures"
            component={TabNavigator}
            options={{
              headerTitle: 'Money Mangement',
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#60BABC',
              },
            }}
          />
          <Stack.Screen
            name="ExpenditureForm"
            component={ExpenditureForm}
            options={{
              headerTitle: 'Details',
              headerTitleAlign: 'center',
            }}
          />
          {/* <Stack.Screen name="Income" component={Income} />
          <Stack.Screen name="AllRecords" component={AllRecords} /> */}
          <Stack.Screen
            options={{
              headerTitleAlign: 'center',
            }}
            name="ShowRecordEntity"
            component={ShowRecordEntity}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
