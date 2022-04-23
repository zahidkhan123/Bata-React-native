import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import Login from '../../screen/auth/Login';
import ForgotPassword from '../../screen/auth/ForgotPassword';
import OtpVerify from '../../screen/auth/Otpverify';
import ChangePassword from '../../screen/auth/ChangePassword';
import UpdatePassword from '../../screen/auth/UpdatePassword';

const AuthNavigator = createStackNavigator();
const Auth = () => {
  return (
    <AuthNavigator.Navigator
      screenOptions={{
        headerMode: 'none',
        tabBarActiveTintColor: '#e4001c',
      }}
    >
      <AuthNavigator.Screen
        name='Login'
        component={Login}

        // options={{
        //   tabBarIcon: (tabInfo) => {
        //     return tabInfo.focused ? <HomeIcon /> : <HomeGrayIcon />;
        //   },
        // }}
      />
      <AuthNavigator.Screen
        name='ForgotPassword'
        component={ForgotPassword}
        // options={{
        //   tabBarIcon: (tabInfo) => {
        //     return tabInfo.focused ? <HomeIcon /> : <HomeGrayIcon />;
        //   },
        // }}
      />
      <AuthNavigator.Screen name='OtpVerify' component={OtpVerify} />
      <AuthNavigator.Screen name='UpdatePassword' component={UpdatePassword} />
      <AuthNavigator.Screen name='ChangePassword' component={ChangePassword} />
    </AuthNavigator.Navigator>
  );
};

export default Auth;
