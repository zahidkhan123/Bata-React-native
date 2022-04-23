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
import backIcon from "../../assets/images/backIcon.svg";
import NextIcon from "../../assets/images/nextIcon.svg";
import Trans from "../../assets/images/transaction.svg";
import CustomButton from "../../components/CustomButton";
import Base from "../../assets/BASE.png";
import tw from "../../common/themeTailwind";
import Model from "../../components/model/CustomModel";
import {useDispatch, useSelector} from "react-redux";
import {walletTransaction} from "../../redux/actions/walletAction";
import {StackActions} from "@react-navigation/native";
const Wallet = ({navigation}) => {
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
    <Wrapper navigation={navigation} backIcon={backIcon} title='My Wallet'>
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(``)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : walletData === null ? (
        <Text
          style={[{ fontFamily: 'SF_bold' }, tw.style(`text-lg text-red-600`)]}
        >
          History not found
        </Text>
      ) : (
        <>
          <ImageBackground
            source={Base}
            style={tw.style(`justify-center mt-5 rounded-lg h-52`)}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('WalletLedgerHistory')}
              style={tw.style(` px-0 py-16 `)}
            >
              <View
                style={tw.style(
                  ` flex flex-row justify-between px-6 items-center `
                )}
              >
                <View style={tw.style(` flex flex-col `)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-black text-xs`),
                    ]}
                  >
                    Current Balance
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_bold' },
                      tw.style(`my-4 text-2xl `),
                    ]}
                  >
                    PKR
                    <Text>
                      {' '}
                      {walletValue
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </Text>
                </View>

                <NextIcon />
              </View>
            </TouchableOpacity>
          </ImageBackground>

          <Text
            style={[{ fontFamily: 'SF_semibold' }, tw.style(`text-2xl mt-5 `)]}
          >
            Recent Transactions
          </Text>

          {data?.amount.slice(0, 4).map((item, index) => (
            <View
              key={index}
              style={tw.style(
                `bg-white flex flex-row justify-between items-center px-4 py-5 rounded-lg my-2 top-2`
              )}
            >
              <View style={tw.style(` flex flex-row items-center`)}>
                <Trans />
                <Text
                  style={[
                    { fontFamily: 'SF_medium' },
                    tw.style(`ml-4  text-base`),
                  ]}
                >
                  Bata
                </Text>
              </View>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(` text-red-500  text-base`),
                ]}
              >
                {commaOperator(item)}
              </Text>
            </View>
          ))}

          <View style={tw.style(`w-52 mx-auto my-5 mb-0`)}>
            <CustomButton color='red' title='+ ADD FUNDS' />
          </View>
        </>
      )}
    </Wrapper>
  );
};

export default Wallet;
