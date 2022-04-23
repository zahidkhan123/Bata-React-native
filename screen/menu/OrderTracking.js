import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

// components
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';
import { TrackOrderAction } from '../../redux/actions/trackOrderAction';
// images
import backIcon from '../../assets/images/backIcon.svg';
import TickCircle from '../../assets/images/menu/Group1.svg';
import Line from '../../assets/images/menu/Line.svg';
import OrderIcon from '../../assets/images/menu/Group2.svg';

// styles tailwind
import tw from '../../common/themeTailwind';
import { updateDeliveryAction } from '../../redux/actions/updateDeliveryAction';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Model from '../../components/model/CustomModel';
import { orderDetail } from '../../redux/actions/categoryAction';

const OrderTracking = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const updateOrder = useSelector((state) => state.updateDelivery);

  const success = updateOrder?.update?.data;
  const trackOrder = useSelector((state) => state.trackOrder);
  const Data = trackOrder?.trackOrder?.data;

  const { loading } = trackOrder;
  const { orderStatus } = route.params;
  const DateHandler = (date) => {
    var demoDate = new Date(date);
    var updateDate = demoDate.toUTCString().slice(0, 11);
    return updateDate;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    dispatch(updateDeliveryAction({ orderID: Data.orderID }));
    setModalVisible(true);
    // orderStatus === 'Delivered'
    //   ? setModalVisible(true)
    //   : setModalVisible(false);
  };
  return (
    <Wrapper navigation={navigation} backIcon={backIcon} title='Track Order'>
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(`mt-24`)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : (
        <View>
          <View style={tw.style(`mt-4`)}>
            <Text
              style={[{ fontFamily: 'SF_bold' }, tw.style(`pb-2 text-base`)]}
            >
              {DateHandler(Data?.createdDate)}
            </Text>
            <Text
              style={[{ fontFamily: 'SF_bold' }, tw.style(`pb-6 text-base`)]}
            >
              Order ID: {Data?.orderID}
            </Text>
          </View>

          {Data?.orderTracking?.map((item, index) => (
            <View style={tw.style(`flex-row pt-2`)} key={index}>
              <View
                style={tw.style(
                  `justify-center items-center relative mr-2 mt-2`
                )}
              >
                <TickCircle style={tw.style(`flex-1 `)} />
                {index < 5 && <Line style={tw.style(`flex-1 mt-3 -mb-2 `)} />}
              </View>
              <View style={tw.style(`flex`)}>
                <Text
                  style={[
                    { fontFamily: 'SF_bold' },
                    tw.style(
                      ` text-base mt-1 tracking-wider ${
                        item.trackStatus === orderStatus
                          ? 'text-green-300 '
                          : 'text-black'
                      }`
                    ),
                  ]}
                >
                  {item.trackStatus}
                </Text>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-sm mt-1 text-gray`),
                  ]}
                >
                  {item.trackDetail}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={tw.style(
              `bg-white flex-row rounded-lg px-2 mt-8 mb-4 py-4 shadow-sm`
            )}
          >
            <View style={tw.style(`flex-1 mx-4 my-3`)}>
              <OrderIcon />
            </View>
            <View style={tw.style(`mx-8 `)}>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`my-2 text-base`),
                ]}
              >
                Delivery Address
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-gray mb-1 text-sm`),
                ]}
              >
                {Data?.deliveryAddress}
              </Text>
            </View>
          </View>

          <View style={tw.style(`w-4/5 my-2 mx-8 mb-10`)}>
            {(orderStatus === 'Onway' || orderStatus === 'Delivered') && (
              <CustomButton
                title='Is Your Order Delivered?'
                color='red'
                onPress={handleSubmit(onSubmit)}
              />
            )}
          </View>
        </View>
      )}
      {success && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          title={success}
          navigateTo=''
          success
        />
      )}
    </Wrapper>
  );
};

export default OrderTracking;
