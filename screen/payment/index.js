import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';

// import Wrapper
import Wrapper from '../../components/Wrapper';
// images
import backIcon from '../../assets/images/backIcon.svg';
import VisaIcon from '../../assets/Visa.svg';
import EasyPaisaIcon from '../../assets/easypaisa.svg';
import PlusIcon from '../../assets/plus.svg';
import JazzCashICon from '../../assets/jazzcash.svg';
import NextIcon from '../../assets/images/nextIcon.svg';

import CustomButton from '../../components/CustomButton';
import Base from '../../assets/BASE.png';
import tw from '../../common/themeTailwind';
import Model from '../../components/model/CustomModel';
import { useDispatch, useSelector } from 'react-redux';
import { walletTransaction } from '../../redux/actions/walletAction';
import { StackActions } from '@react-navigation/native';
const Payment = ({ navigation }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { UserName } = userLogin?.userInfo?.data;
  const walletData = useSelector((state) => state.wallet);
  const { loading } = walletData;
  const data = walletData?.walletTransactions?.data;
  const walletValue = walletData?.walletTransactions?.data?.current_balance;
  const commaOperator = (num) => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };
  useEffect(() => {
    dispatch(walletTransaction({ outletID: UserName }));
  }, []);

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

  return (
    <Wrapper navigation={navigation} backIcon={backIcon} title='Pay Now'>
      <Text
        style={[
          { fontFamily: 'SF_regular' },
          tw.style(`text-2xl mt-5 font-bold border-b-2 border-gray-400 py-2 `),
        ]}
      >
        Order Summary
      </Text>

      <View
        style={tw.style(
          ` flex flex-row  justify-between border-b-2 border-gray-400 px-4 py-2  my-6 top-2`
        )}
      >
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(`font-bold text-base `),
          ]}
        >
          Wallet Balance
        </Text>
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(` font-bold text-base`),
          ]}
        >
          {commaOperator(24342312)}
        </Text>
      </View>
      <View
        style={tw.style(
          ` flex flex-row  justify-between border-b-2 border-gray-400 px-4 py-2  mb-6 top-2`
        )}
      >
        <Text style={[{ fontFamily: 'SF_regular' }, tw.style(`text-base `)]}>
          Payable Balance
        </Text>
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(` font-bold text-base`),
          ]}
        >
          {commaOperator(24342312)}
        </Text>
      </View>
      <View
        style={tw.style(
          ` flex flex-row  justify-between   px-4 py-2  mb-6 top-2`
        )}
      >
        <Text style={[{ fontFamily: 'SF_regular' }, tw.style(` text-base `)]}>
          Remaining Balance
        </Text>
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(` font-bold text-base`),
          ]}
        >
          {commaOperator(24342312)}
        </Text>
      </View>

      <View
        style={tw.style(` flex flex-col  justify-between    py-2  mb-3 top-2`)}
      >
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(`text-2xl  font-bold border-b-2 border-gray-400 py-2 `),
          ]}
        >
          Select Payment Method
        </Text>
        <View
          style={tw.style(
            `bg-white flex flex-row justify-between items-center  px-4  py-3 rounded-lg my-2 top-2`
          )}
        >
          <View style={tw.style(` flex flex-row items-center`)}>
            <VisaIcon />
            <View style={tw.style(`flex flex-col  ml-5 `)}>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(` text-base font-bold`),
                ]}
              >
                Visa
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`mt-2 text-xs text-gray `),
                ]}
              >
                **** **** **** 4543
              </Text>
            </View>
          </View>
          <NextIcon />
        </View>
        <View
          style={tw.style(
            `bg-white flex flex-row justify-between items-center  px-4  py-1 rounded-lg my-2 top-2`
          )}
        >
          <EasyPaisaIcon />
          <NextIcon />
        </View>
        <View
          style={tw.style(
            `bg-white flex flex-row justify-between items-center  px-4  py-3 rounded-lg my-2 top-2`
          )}
        >
          <JazzCashICon />
          <NextIcon />
        </View>
      </View>
      <View style={tw.style(`my-5 flex  items-center`)}>
        <Text style={{ fontFamily: 'SF_regular' }}>OR</Text>
      </View>
      <View style={tw.style(`flex items-center`)}>
        <TouchableOpacity
          onPress={() => navigation.navigate('addPayCard')}
          style={tw.style(
            `flex flex-row rounded-xl bg-light-blue w-52  h-12 justify-center items-center `
          )}
        >
          <PlusIcon />
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(`text-white ml-2 mt-1 text-lg`),
            ]}
          >
            Add Card
          </Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

export default Payment;
