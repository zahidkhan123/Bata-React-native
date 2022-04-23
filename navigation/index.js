import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// View
import Dashboard from '../screen/Dashboard';
import Cart from '../screen/cart/Cart';
import Wallet from '../screen/wallet/Wallet';
import Notification from '../screen/notification/Notification';
import Menu from '../screen/menu/Menu';
import SuggestedOrder from '../screen/suggestedOrder';
import Catalog from '../screen/catalog';
import CustomOrder from '../screen/customOrder';
import History from '../screen/orderHistory';
import ProductFilter from '../screen/ProductFilter';
import ProductOrderCard from '../components/ProductOrderCard';
import EditOrder from '../screen/editOrder';
import CustomEditOrder from '../screen/customEditOrder';
import CatalogProducts from '../components/CatalogProducts';
// Menu View

import Feedback from '../screen/menu/Feedback';
import StoreProfile from '../screen/menu/StoreProfile';
import OrderTracking from '../screen/menu/OrderTracking';
import PerformanceAnalysis from '../screen/menu/performanceAnalysis/index';
import GraphScreen from '../screen/menu/performanceAnalysis/GraphScreen';
import StoreLocator from '../screen/menu/StoreLocator';
import UpdatePassword from '../screen/auth/UpdatePassword';
import Profile from '../screen/menu/Profile';

//svg Icon
import HomeIcon from '../assets/images/home.svg';
import HomeGrayIcon from '../assets/grayhome.svg';
import MenuIcon from '../assets/images/menu.svg';
import GraymenuIcon from '../assets/graymenu.svg';
import BellIcon from '../assets/bell.svg';
import GraybellIcon from '../assets/graybell.svg';
import TrollyIcon from '../assets/images/trolley.svg';
import GraytrollyIcon from '../assets/graytrolly.svg';
import WalletIcon from '../assets/images/wallet.svg';
import GrayWalletIcon from '../assets/graywallet.svg';

// Apps Navigation Satcks
import Auth from './AuthNavigator/AuthNavigator';
import Home from './HomeNavigator/HomeNavigator';
import OrderSummaryCart from '../screen/cart/OrderSummaryCart';
import WalletLedgerHistory from '../screen/wallet/WalletLedgerHistory';
import OrderSummaryHistory from '../screen/orderHistory/OrderSummaryHistory';
import Payment from '../screen/payment';
import AddCardPayment from '../screen/payment/AddCardPayment';
import OrderSuccess from '../screen/cart/orderSuccess';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// home stack
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerMode: 'none',
        tabBarActiveTintColor: '#e4001c',
      }}
    >
      <HomeStack.Screen name='Dashboard' component={Dashboard} />
      <HomeStack.Screen name='SuggestedOrder' component={SuggestedOrder} />
      {/* <HomeStack.Screen name='Catalog' component={Catalog} /> */}
      <HomeStack.Screen name='Catalog' component={CatalogProducts} />

      <HomeStack.Screen name='CustomOrder' component={CustomOrder} />
      <HomeStack.Screen name='History' component={History} />
      <HomeStack.Screen name='ProductFilter' component={ProductFilter} />
      <HomeStack.Screen name='ProductOrderCard' component={ProductOrderCard} />
      {/* <HomeStack.Screen name='Dashboard' component={Dashboard} /> */}
      <HomeStack.Screen name='EditOrder' component={EditOrder} />
      <HomeStack.Screen name='CustomEditOrder' component={CustomEditOrder} />
      <HomeStack.Screen name='SummaryHistory' component={OrderSummaryHistory} />
    </HomeStack.Navigator>
  );
};

const MenuStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerMode: 'none',
        tabBarActiveTintColor: '#e4001c',
      }}
    >
      <HomeStack.Screen name='Menu' component={Menu} />
      <HomeStack.Screen name='Feedback' component={Feedback} />
      <HomeStack.Screen name='StoreProfile' component={StoreProfile} />
      <HomeStack.Screen name='Profile' component={Profile} />
      <HomeStack.Screen name='OrderTracking' component={OrderTracking} />
      <HomeStack.Screen
        name='PerformanceAnalysis'
        component={PerformanceAnalysis}
      />
      <HomeStack.Screen name='GraphScreen' component={GraphScreen} />
      <HomeStack.Screen name='StoreLocator' component={StoreLocator} />
      <HomeStack.Screen name='UpdatePassword' component={UpdatePassword} />
    </HomeStack.Navigator>
  );
};

const WalletStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='wallet'
      screenOptions={{
        headerMode: 'none',
        tabBarActiveTintColor: '#e4001c',
      }}
    >
      <HomeStack.Screen name='wallet' component={Wallet} />
      <HomeStack.Screen
        name='WalletLedgerHistory'
        component={WalletLedgerHistory}
      />
    </HomeStack.Navigator>
  );
};
const CartStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName='cart'
      screenOptions={{
        headerMode: 'none',
        tabBarActiveTintColor: '#e4001c',
      }}
    >
      <HomeStack.Screen name='cart' component={Cart} />
      <HomeStack.Screen name='OrderSummaryCart' component={OrderSummaryCart} />
      <HomeStack.Screen name='payment' component={Payment} />
      <HomeStack.Screen name='addPayCard' component={AddCardPayment} />
      <HomeStack.Screen name='orderSuccess' component={OrderSuccess} />
    </HomeStack.Navigator>
  );
};
export const AppNavigation = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;
  const token = userLogin?.userInfo?.data?.Token;
  const [isShown, setIsShow] = useState(false);

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          screenOptions={{
            headerMode: 'none',
            tabBarActiveTintColor: '#e4001c',
          }}
        >
          <Tab.Screen
            name='Home'
            component={HomeStackScreen}
            options={{
              header: () => null,
              tabBarIcon: (tabInfo) => {
                return tabInfo.focused ? <HomeIcon /> : <HomeGrayIcon />;
              },
            }}
          />
          <Tab.Screen
            name='Cart'
            component={CartStackScreen}
            options={{
              header: () => null,
              tabBarIcon: (tabInfo) => {
                return tabInfo.focused ? <GraytrollyIcon /> : <TrollyIcon />;
              },
            }}
          />
          <Tab.Screen
            name='Wallet'
            component={WalletStackScreen}
            options={{
              header: () => null,
              tabBarIcon: (tabInfo) => {
                return tabInfo.focused ? <GrayWalletIcon /> : <WalletIcon />;
              },
            }}
          />
          <Tab.Screen
            name='Notification'
            component={Notification}
            options={{
              header: () => null,
              tabBarIcon: (tabInfo) => {
                return tabInfo.focused ? <BellIcon /> : <GraybellIcon />;
              },
            }}
          />
          <Tab.Screen
            name='Menu'
            component={MenuStackScreen}
            options={{
              header: () => null,
              tabBarIcon: (tabInfo) => {
                return tabInfo.focused ? <GraymenuIcon /> : <MenuIcon />;
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerMode: 'none',
          }}
        >
          <Stack.Screen name='Auth' component={Auth}></Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

{
  /* <Stack.Navigator screenOptions={{ headerMode: 'none' }}>
{token ? (
  <>
    <Stack.Screen
      name='Home'
      component={Home}
      tabs={Tabs}
    ></Stack.Screen>
    <Stack.Screen name='Tabs' component={Tabs}></Stack.Screen>
  </>
) : (
  <Stack.Screen name='Auth' component={Auth}></Stack.Screen>
)}
</Stack.Navigator> */
}
