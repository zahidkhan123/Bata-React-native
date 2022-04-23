import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import NextIcon from '../../assets/images/nextIcon.svg';

import tw from '../../common/themeTailwind';
import { useDispatch, useSelector } from 'react-redux';

import { ScrollView } from 'react-native-gesture-handler';
import { OrderScheduleAction } from '../../redux/actions/orderScheduleAction';
import { SummaryHistoryAction } from '../../redux/actions/summaryHistoryAction';
import { TrackOrderAction } from '../../redux/actions/trackOrderAction';

const OrderSchedule = ({ navigation }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { UserName } = userLogin?.userInfo?.data;
  const scheduleInfo = useSelector((state) => state.orderSchedule);
  const data = scheduleInfo?.scheduleInfo?.data;

  const { loading } = scheduleInfo;
  useEffect(() => {
    dispatch(OrderScheduleAction({ outletID: UserName }));
  }, []);
  let month;
  let day;
  const dateConverter = (date) => {
    let dates = new Date(date);
    month = dates.toDateString().slice(3, 7);
    day = dates.toDateString().slice(7, 10);
  };

  const commaOperator = (num) => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading && (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(`mt-72`)}
            size='large'
            color='#ff0000'
          />
        </View>
      )}
      {data?.map((item, index) => (
        <View
          key={index}
          style={tw.style(
            `bg-skin-light flex flex-col p-4 rounded-lg my-3 top-2  `
          )}
        >
          <View style={tw.style(`flex flex-row items-center justify-around`)}>
            <View
              style={tw.style(
                ` flex items-center justify-around p-2 bg-black rounded-lg	`
              )}
            >
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-white items-center text-xs `),
                ]}
              >
                {dateConverter(item.createdDate)}
                {month}
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-white items-center text-xs `),
                ]}
              >
                {day}
              </Text>
            </View>
            <View style={tw.style(`my-2`)}>
              <Text
                style={[{ fontFamily: 'SF_regular' }, tw.style(`text-xs `)]}
              >
                Order ID: {item.orderNo}
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-red-600 mt-2 text-xs`),
                ]}
              >
                Price: {commaOperator(item.amount)}
              </Text>
            </View>
            <View style={tw.style(`flex`)}>
              <Pressable
                onPress={() => {
                  dispatch(TrackOrderAction({ orderID: item.orderNo }));
                  navigation.navigate('Menu', {
                    screen: 'OrderTracking',
                    params: { orderStatus: item.order_status },
                  });
                }}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(
                      `text-blue-300 text-xs border-b-2  mb-5 border-blue-300`
                    ),
                  ]}
                >
                  Track Order
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={tw.style(`flex-row justify-between p-4 mt-2 items-center  `)}
          >
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `text-xs ${
                    item.order_status === 'Pending'
                      ? 'text-yellow-300 '
                      : item.order_status === 'InProcess'
                      ? 'text-orange-600'
                      : item.order_status === 'Onway'
                      ? 'text-orange-300'
                      : item.order_status === 'Invoiced'
                      ? 'text-red-orange'
                      : 'text-black'
                  } `
                ),
              ]}
            >
              {item.order_status}
            </Text>

            <TouchableOpacity
              style={tw.style(`p-2  bg-white rounded-full`)}
              onPress={() => {
                dispatch(SummaryHistoryAction({ OrderId: item.orderNo }));
                navigation.navigate('SummaryHistory');
              }}
            >
              <NextIcon style={tw.style(`p-2`)} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  base: {
    marginTop: 10,
    height: 250,
    width: 400,
    borderRadius: 20,
    zIndex: -10,

    // backgroundColor: "red",
  },
});
export default OrderSchedule;
