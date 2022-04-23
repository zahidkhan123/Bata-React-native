import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// images
import NextIcon from '../../assets/images/nextIcon.svg';
import tw from '../../common/themeTailwind';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { OrderHistoryAction } from '../../redux/actions/orderHistoryAction';
import { SummaryHistoryAction } from '../../redux/actions/summaryHistoryAction';
import { TrackOrderAction } from '../../redux/actions/trackOrderAction';

const OrderHistory = ({ navigation }) => {
  let month;
  let day;
  const dateConverter = (date) => {
    let dates = new Date(date);
    month = dates.toDateString().slice(3, 7);
    day = dates.toDateString().slice(7, 10);
  };
  useEffect(() => {
    dispatch(OrderHistoryAction({ outletID: UserName }));
  }, []);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { UserName } = userLogin?.userInfo?.data;
  const historyInfo = useSelector((state) => state.orderHistory);
  const data = historyInfo?.historyInfo?.data;

  const { loading } = historyInfo;

  const commaOperator = (num) => {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  };

  return (
    <View>
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
              `bg-purple-light flex flex-col rounded-lg my-3 p-4 top-2  `
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
                    { fontFamily: 'SF_medium' },
                    tw.style(`text-white items-center text-xs `),
                  ]}
                >
                  {dateConverter(item.createdDate)}
                  {month}
                </Text>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-white items-center text-xs  `),
                  ]}
                >
                  {day}
                </Text>
              </View>
              <View style={tw.style(` my-2`)}>
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
              <View>
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
                        `text-blue-300 border-b-2 border-blue-300 mb-5 text-xs`
                      ),
                    ]}
                  >
                    Track Order
                  </Text>
                </Pressable>
              </View>
            </View>
            <View
              style={tw.style(
                `flex-row justify-between items-center mt-2 p-4 `
              )}
            >
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(
                    `text-xs ${
                      item.order_status === 'Delivered'
                        ? 'text-green-300 '
                        : 'text-blue-300'
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
    </View>
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
export default OrderHistory;
