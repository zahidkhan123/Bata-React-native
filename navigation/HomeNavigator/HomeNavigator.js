import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Menu from '../../screen/menu/Menu';
import Profile from '../../screen/menu/Profile';
import ProductFilter from '../../screen/ProductFilter';
import ProductOrderCard from '../../components/ProductOrderCard';
import EditOrder from '../../screen/editOrder';
import Catalog from '../../screen/catalog';
import SuggestedOrder from '../../screen/suggestedOrder';
import CustomOrder from '../../screen/customOrder';
import History from '../../screen/orderHistory';
import Dashboard from '../../screen/Dashboard';

const HomeScreenNavigator = createStackNavigator();

const Home = ({ Tabs }) => {
  return (
    <HomeScreenNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e4001c',
        headerMode: 'none',
      }}
    >
      <Tabs />
      <HomeScreenNavigator.Screen name='Dashboard' component={Dashboard} />
      <HomeScreenNavigator.Screen
        name='SuggestedOrder'
        component={SuggestedOrder}
      />
      <HomeScreenNavigator.Screen name='CustomOrder' component={CustomOrder} />
      <HomeScreenNavigator.Screen name='History' component={History} />
      <HomeScreenNavigator.Screen name='Catalog' component={Catalog} />
      <HomeScreenNavigator.Screen name='Menu' component={Menu} />
      <HomeScreenNavigator.Screen name='Profile' component={Profile} />
      <HomeScreenNavigator.Screen name='Feedback' component={Feedback} />
      <HomeScreenNavigator.Screen
        name='StoreProfile'
        component={StoreProfile}
      />
      <HomeScreenNavigator.Screen
        name='OrderTracking'
        component={OrderTracking}
      />
      <HomeScreenNavigator.Screen
        name='PerformanceAnalysis'
        component={PerformanceAnalysis}
      />
      <HomeScreenNavigator.Screen name='GraphScreen' component={GraphScreen} />
      <HomeScreenNavigator.Screen
        name='StoreLocator'
        component={StoreLocator}
      />
      <HomeScreenNavigator.Screen
        name='ProductFilter'
        component={ProductFilter}
      />
      <HomeScreenNavigator.Screen
        name='ProductOrderCard'
        component={ProductOrderCard}
      />
      <HomeScreenNavigator.Screen name='EditOrder' component={EditOrder} />
      <HomeScreenNavigator.Screen
        name='ChangePassword'
        component={ChangePassword}
      />
    </HomeScreenNavigator.Navigator>
  );
};

export default Home;
