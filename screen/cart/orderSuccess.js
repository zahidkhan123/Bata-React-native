import React, {useEffect} from "react";
import {View, Text, BackHandler} from "react-native";
import { useDispatch } from 'react-redux';
import tw from 'tailwind-react-native-classnames';

// backIcon Image
import backIcon from '../../assets/images/backIcon.svg';
import SuccessIcon from '../../assets/SuccessfullIcon.svg';
import CustomButton from '../../components/CustomButton';
// import Wrapper
import Wrapper from '../../components/Wrapper';
import { resetCart } from '../../redux/actions/cartAction';

const OrderSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const resetHandler = () => {
    dispatch(resetCart());
    navigation.navigate('History');
  };

  return (
    <Wrapper navigation={navigation} title='Order Success' backIcon={backIcon}>
      <View style={tw.style(`flex flex-col items-center my-2`)}>
        <Text
          style={[
            { fontFamily: 'SF_semibold' },
            tw.style(`text-red-600 text-base text-center my-3`),
          ]}
        >
          Your Order ID: 73104
        </Text>
        <Text
          style={[
            { fontFamily: 'SF_semibold' },
            tw.style(` text-lg text-center`),
          ]}
        >
          Pending
        </Text>

        <View style={tw.style(`my-4`)}>
          <SuccessIcon />
        </View>

        <Text
          style={[
            { fontFamily: 'SF_medium' },
            tw.style(` text-sm mb-16  text-center px-20`),
          ]}
        >
          Your Order has been placed. We will contact you soon for confirmation.
        </Text>
        <View style={tw.style(`w-52 mx-auto `)}>
          <CustomButton
            color='red'
            title='Track Your Order'
            onPress={() => resetHandler()}
          />
        </View>
      </View>
    </Wrapper>
  );
};

export default OrderSuccess;
