import React from 'react';
import { Text, View } from 'react-native';

// components
import Wrapper from '../../components/Wrapper';
import OrderSchedule from './OrderSchedule';
import OrderHistory from './OrderHistory';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import tw from 'tailwind-react-native-classnames';
const History = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  const tabBarOptions = {
    activeTintColor: 'red',
    inactiveTintColor: 'black',

    indicatorStyle: {
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderColor: 'red',
      height: '100%',
    },
    pressOpacity: 1,
    style: {
      borderRadius: 5,
    },
  };
  return (
    <Wrapper title='Order History' backIcon navigation={navigation}>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name='Order Schedule' component={OrderSchedule} />
        <Tab.Screen name='Order History' component={OrderHistory} />
      </Tab.Navigator>
    </Wrapper>
  );
};

export default History;
