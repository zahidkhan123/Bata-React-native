import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';

// import Wrapper
import Wrapper from '../../components/Wrapper';
import CardWrapper from '../../components/CardWrapper';
// images
import backIcon from '../../assets/images/backIcon.svg';
import CalenderICon from '../../assets/CalenderIcon.svg';
import CashPayment from '../../assets/cash-payment.svg';
import DownArrow from '../../assets/Down-Arrow.svg';
import tw from '../../common/themeTailwind';
import CloseIcon from '../../assets/images/close.svg';
import EmptyData from '../../assets/empty-data.svg';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { ledgerAction } from '../../redux/actions/ledgerAction';
// use hook form
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import Model from '../../components/model/CustomModel';
const WalletLedgerHistory = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rangeUpdate, setRangeUpdate] = useState(false);
  const [weekData, setWeekData] = useState();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { UserName } = userLogin?.userInfo?.data;

  const ledgerData = useSelector((state) => state?.ledgerHistory);
  const { loading, error } = ledgerData;
  debugger;
  const ob = ledgerData?.ledger?.data?.opening_balance;
  const cb = ledgerData?.ledger?.data?.closing_balance;
  const data = ledgerData?.ledger?.data?.transactions;

  useEffect(() => {
    dispatch(
      ledgerAction({
        outletID: UserName,
      })
    );
  }, [dispatch]);

  const dateConverter = (date) => {
    let dates = new Date(date);
    let str = dates.toLocaleDateString();

    return str;
  };

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      ledgerAction({
        outletID: UserName,
        start_week: data.startWeek,
        end_week: data.endWeek,
      })
    );
    setModalVisible(false);
    setRangeUpdate(true);
    setWeekData(data);
    reset();
  };

  const commaOperator = (num) => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };
  return (
    <>
      <Wrapper
        navigation={navigation}
        backIcon={backIcon}
        title='Wallet Ledger History'
      >
        {loading ? (
          <View style={tw.style(`my-auto`)}>
            <ActivityIndicator size='large' color='#ff0000' />
          </View>
        ) : (
          <>
            <View
              style={tw.style(
                `flex flex-row justify-end items-center my-1  rounded-lg  p-3`
              )}
            >
              <Text
                style={[
                  { fontFamily: 'SF_medium' },
                  tw.style(` mr-1 mt-1 text-xs text-center  `),
                ]}
              >
                Week Range:
              </Text>
              {!rangeUpdate && (
                <Text
                  style={[
                    { fontFamily: 'SF_medium' },
                    tw.style(`  mr-2 mt-1 text-xs text-center `),
                  ]}
                >
                  Current Week
                </Text>
              )}

              {rangeUpdate && (
                <Text
                  style={[
                    { fontFamily: 'SF_medium' },
                    tw.style(` mr-2 text-xs mt-1 text-center`),
                  ]}
                >
                  {weekData?.startWeek} - {weekData?.endWeek}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  console.log('Button Pressed');
                }}
              >
                <CalenderICon />
              </TouchableOpacity>
            </View>

            {error ? (
              <View style={tw.style(`flex justify-center items-center my-48`)}>
                <EmptyData />
              </View>
            ) : (
              <View
                style={tw.style(`flex flex-col justify-between p-2 my-1  `)}
              >
                <View style={tw.style(`flex flex-row   `)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_semibold' },
                      tw.style(` text-base  mb-2 `),
                    ]}
                  >
                    ACCOUNT -
                  </Text>
                  <Text
                    style={[
                      { fontFamily: 'SF_semibold' },
                      tw.style(` text-base font-bold mb-2 `),
                    ]}
                  >
                    {ledgerData?.ledger?.data?.account_id}
                  </Text>
                </View>
                <Text
                  style={[{ fontFamily: 'SF_medium' }, tw.style(`text-base  `)]}
                >
                  Address: {ledgerData?.ledger?.data?.account_title}
                </Text>
              </View>
            )}
            <ScrollView style={tw.style(`mb-10`)}>
              {/* Account Details */}
              {data?.map((item, index) => (
                <View
                  key={index}
                  style={tw.style(
                    `flex-row border-2 border-gray-200 mt-2 rounded-lg`
                  )}
                >
                  <View
                    style={tw.style(
                      `flex-2 border-r-2 my-2 border-gray-200 items-center py-2`
                    )}
                  >
                    <View
                      style={tw.style(
                        `flex flex-row rounded-full  border-2 items-center p-2 ${
                          item.transaction_type === 'credit'
                            ? 'border-green-dark'
                            : 'border-red'
                        } `
                      )}
                    >
                      <DownArrow />
                      <CashPayment />
                    </View>
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(
                          ` ${
                            item.transaction_type === 'credit'
                              ? 'text-green-dark'
                              : 'text-red-600'
                          }  text-xs mt-3 text-center`
                        ),
                      ]}
                    >
                      {capitalize(item.transaction_type)}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-3 flex-col justify-around border-r-2 border-gray-200 px-1 my-2 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-xs text-center`),
                      ]}
                    >
                      Week: {item.week}
                    </Text>
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-xs text-center`),
                      ]}
                    >
                      Date: {dateConverter(item.date)}
                    </Text>
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-xs  text-center`),
                      ]}
                    >
                      Narration: {item.narration}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2 border-r-2 border-gray-200 my-2 items-center flex-col justify-between py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-xs   text-center`),
                      ]}
                    >
                      {capitalize(item.transaction_type)}
                    </Text>
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-xs  text-center`),
                      ]}
                    >
                      {commaOperator(item.transaction_amount)}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2  items-center flex-col  my-2 justify-between py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-red-600  text-xs text-center`),
                      ]}
                    >
                      Balance
                    </Text>
                    <Text
                      style={[
                        { fontFamily: 'SF_medium' },
                        tw.style(`text-red-600 text-xs  text-center`),
                      ]}
                    >
                      {commaOperator(item.balance)}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <Modal
              animationType='slide'
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={tw.style(
                  'flex-1 justify-center items-center bg-black-opacity'
                )}
              >
                <View
                  style={tw.style(
                    'flex  bg-white relative rounded-xl py-8 px-8 w-5/7  items-center'
                  )}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                    style={tw.style('absolute right-6 top-6')}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                  <View style={tw.style('pt-10')}>
                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(` text-center text-lg font-bold leading-7 `),
                      ]}
                    >
                      Select Week Range
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex flex-row justify-around items-center w-72 text-center text-lg leading-7 `
                    )}
                  >
                    <CustomInput
                      control={control}
                      errors={errors}
                      name='startWeek'
                      rules={{
                        required: 'true',
                      }}
                      errorMessage='Required Field'
                      placeholder='YY:MM'
                      style='bg-smoke w-24 text-sm text-center '
                      maxLength='4'
                      keyboardType='numeric'
                    />
                    <CustomInput
                      control={control}
                      errors={errors}
                      name='endWeek'
                      rules={{
                        required: 'true',
                      }}
                      errorMessage='Required Field'
                      placeholder='YY:MM'
                      style='bg-smoke w-24 text-sm text-center'
                      maxLength='4'
                      keyboardType='numeric'
                    />
                  </View>
                  <View style={tw.style('mt-2')}>
                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(` text-center text-xs leading-7 `),
                      ]}
                    >
                      Note YY = Year & WW = Week
                    </Text>
                  </View>
                  <View style={tw.style(`w-52 text-center  mx-auto my-4`)}>
                    <CustomButton
                      color='red'
                      title='Submit'
                      onPress={handleSubmit(onSubmit)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </Wrapper>
      {!error && (
        <View
          style={tw.style(
            ` flex flex-row justify-around items-center p-4 bg-red w-full mx-auto  `
          )}
        >
          <View style={tw.style(` flex flex-col items-center `)}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(`text-white text-sm mx-auto `),
              ]}
            >
              Opening Balance
            </Text>
            <Text
              style={[
                { fontFamily: 'SF_bold' },
                tw.style(`text-white font-bold mt-1 text-sm mx-auto `),
              ]}
            >
              {ob?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View style={tw.style(` flex flex-col  items-center `)}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(`text-white mx-auto `),
              ]}
            >
              Closing Balance
            </Text>
            <Text
              style={[
                { fontFamily: 'SF_bold' },
                tw.style(`text-white text-sm mt-1 font-bold mx-auto `),
              ]}
            >
              {cb?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  child: {
    // padding: 20,
    // backgroundColor: '#d9d9d9',
    elevation: 8,
    shadowColor: 'gray',
    shadowOpacity: 0.01,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 100, // <- Radius of the shadow
  },
});

export default WalletLedgerHistory;
