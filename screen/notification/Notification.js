import React, { useEffect } from 'react';
import { View, Text, BackHandler, ActivityIndicator } from 'react-native';

// backIcon Image
import backIcon from '../../assets/images/backIcon.svg';
// import Wrapper
import Wrapper from '../../components/Wrapper';

// tailwind css
import tw from '../../common/themeTailwind';

// Import Images
import ImgOne from '../../assets/images/notification/Group1.svg';
import ImgTwo from '../../assets/images/notification/Group2.svg';
import ImgThree from '../../assets/images/notification/Group3.svg';
import ImgFour from '../../assets/images/notification/Group4.svg';
import { useDispatch, useSelector } from 'react-redux';
import { orderNotificationAction } from '../../redux/actions/orderNotificationAction';
import { ScrollView } from 'react-native-gesture-handler';
const Notification = ({ navigation }) => {
  const notificationData = useSelector((state) => state.orderNotification);
  const { loading } = notificationData;
  const Data = notificationData?.Notification?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderNotificationAction());
  }, [dispatch]);
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

  const timeConverter = (date) => {
    let dates = new Date(date);
    var hours = dates.getHours();
    var minutes = dates.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  const SvgHandler = (item) => {
    switch (item.title) {
      case 'Payment':
        return <ImgFour />;
      case 'Order':
        return <ImgTwo />;
      case 'Discount':
        return <ImgThree />;
      case 'Ledger':
        return <ImgFour />;
      case 'New Shoe Line':
        return <ImgOne />;
    }
  };
  return (
    <Wrapper navigation={navigation} title='Notification' backIcon={backIcon}>
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(``)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : (
        <View style={tw.style(`mb-10 mt-2`)}>
          {Data?.map((item) => (
            <View
              style={tw.style(
                `bg-white flex flex-row items-center px-3 py-7 rounded-lg my-2 `
              )}
              key={item.id}
            >
              {SvgHandler(item)}
              <View style={tw.style(`mx-4 w-9/12`)}>
                <View
                  style={tw.style(`flex flex-row items-center justify-between`)}
                >
                  <Text
                    style={[{ fontFamily: 'SF_bold' }, tw.style(`text-sm`)]}
                  >
                    {item.title}
                  </Text>
                  <Text style={tw.style(`text-right text-xs text-gray`)}>
                    {timeConverter(item.date)}
                  </Text>
                </View>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`mt-2 text-sm leading-4`),
                  ]}
                >
                  {item.description}
                </Text>

                {/* <Text style={tw.style(``)}>{item.date}</Text> */}
              </View>
            </View>
          ))}
        </View>
      )}
    </Wrapper>
  );
};

export default Notification;
