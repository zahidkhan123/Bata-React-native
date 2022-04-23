import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
// components
import Wrapper from '../../components/Wrapper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// images
import backIcon from '../../assets/images/backIcon.svg';
import tw from 'tailwind-react-native-classnames';
import CartSuggestedOrder from '../../components/CartSuggestedOrder';
import CartCustomOrder from '../../components/CartCustomOrder';

const Cart = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();

  // hardware back button functionality
  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home', {
        screen: 'Dashboard',
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const tabBarOptions = {
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    indicatorStyle: {
      backgroundColor: '#4CA5EC',
      borderRadius: 5,
      height: '100%',
    },
    pressOpacity: 1,
    style: {
      borderRadius: 5,
    },
  };

  return (
    <Wrapper navigation={navigation} backIcon={backIcon} title='Cart'>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name='Suggested Order' component={CartSuggestedOrder} />
        <Tab.Screen name='Custom Order' component={CartCustomOrder} />
      </Tab.Navigator>
    </Wrapper>
  );
};

export default Cart;
