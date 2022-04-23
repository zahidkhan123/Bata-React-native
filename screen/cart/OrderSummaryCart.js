import React from 'react';
import { View, Text, Svg, ScrollView, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';

// components
import Wrapper from '../../components/Wrapper';
import FormWrapper from '../../components/auth/AuthFormWrapper';
import CustomInput from '../../components/CustomInput';

// images
import backArrow from '../../assets/images/Nevigationbar.svg';

// styles tailwind css
import tw from '../../common/themeTailwind';
import PayableAmount from '../../components/PayableAmount';
import CustomButton from '../../components/CustomButton';
import { useSelector } from 'react-redux';

const OrderSummaryCart = ({ navigation }) => {
  const checkout = useSelector((state) => state?.checkout);
  const { loading } = checkout;
  const { suggested_order, custom_order, order_summery } = checkout?.data?.data;
  // const suggested_order_summary = checkout?.suggested_order;
  // const custom_order_summary = checkout?.custom_order;
  // const order_summary = checkout?.order_summery;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const paymentHandler = () => {
    if (order_summery.payable_balance < order_summery.available_balance) {
      navigation.navigate('orderSuccess');
    } else {
      navigation.navigate('payment');
    }
  };

  return (
    <Wrapper
      navigation={navigation}
      title='Order Summary'
      backArrow={backArrow}
    >
      <FormWrapper style='#FFFFFF'>
        {loading && (
          <View style={tw.style(`my-auto`)}>
            <ActivityIndicator size='large' color='#ff0000' />
          </View>
        )}
        <ScrollView>
          {suggested_order !== null && (
            <>
              <View
                style={tw.style(
                  `flex flex-row justify-between items-center  rounded-lg bg-gray-200 p-3`
                )}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_bold' },
                    tw.style(`text-white text-center`),
                  ]}
                >
                  Order Id:
                  <Text
                    style={[
                      { fontFamily: 'SF_bold' },
                      tw.style(`text-red text-center`),
                    ]}
                  >
                    {suggested_order?.orderNo}
                  </Text>
                </Text>
              </View>

              <View style={tw.style(`py-3`)}>
                <View
                  style={tw.style(
                    `flex-row border border-gray-200  justify-between`
                  )}
                >
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Sr.#
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-3 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Article
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Qty
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Price
                    </Text>
                  </View>
                  <View style={tw.style(`flex-2 items-center py-2`)}>
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Value
                    </Text>
                  </View>
                </View>

                {suggested_order &&
                  suggested_order?.order_products.map((item, index) => {
                    return (
                      <View
                        style={tw.style(
                          `flex-row border border-t-0 border-gray-200 justify-between`
                        )}
                      >
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black  text-center`),
                            ]}
                          >
                            {item.serialNo}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-3 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black  text-center`),
                            ]}
                          >
                            {item.articleNo}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black   text-center`),
                            ]}
                          >
                            {item.quantity}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black  text-center`),
                            ]}
                          >
                            {item.retailPrice}
                          </Text>
                        </View>
                        <View style={tw.style(`flex-2 items-center py-2`)}>
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black  text-center`),
                            ]}
                          >
                            {item.quantity * item.retailPrice}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
              <PayableAmount suggested suggested_order={suggested_order} />
            </>
          )}

          {custom_order !== null && (
            <>
              <View
                style={tw.style(
                  `flex flex-row justify-between bg-light-blue items-center my-3 rounded-lg  p-3`
                )}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_bold' },
                    tw.style(`text-white text-center`),
                  ]}
                >
                  Custom Order
                </Text>

                <Text
                  style={[
                    { fontFamily: 'SF_bold' },
                    tw.style(`text-white  text-center`),
                  ]}
                >
                  Order Id:
                  <Text
                    style={[
                      { fontFamily: 'SF_bold' },
                      tw.style(`text-red text-center`),
                    ]}
                  >
                    {custom_order?.orderNo}
                  </Text>
                </Text>
              </View>

              <View style={tw.style(`py-3`)}>
                <View
                  style={tw.style(
                    `flex-row border  border-gray-200 justify-between`
                  )}
                >
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red text-center`),
                      ]}
                    >
                      Sr.#
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-3 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red  text-center`),
                      ]}
                    >
                      Article
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red  text-center`),
                      ]}
                    >
                      Qty
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-2 border-r border-gray-200 items-center py-2`
                    )}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red  text-center`),
                      ]}
                    >
                      Price
                    </Text>
                  </View>
                  <View style={tw.style(`flex-2 items-center py-2`)}>
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-red  text-center`),
                      ]}
                    >
                      Value
                    </Text>
                  </View>
                </View>
                {custom_order &&
                  custom_order?.order_products.map((item, index) => {
                    return (
                      <View
                        style={tw.style(
                          `flex-row border border-t-0 border-gray-200 justify-between`
                        )}
                      >
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black text-center`),
                            ]}
                          >
                            {item.serialNo}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-3 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black text-center`),
                            ]}
                          >
                            {item.articleNo}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black   text-center`),
                            ]}
                          >
                            {item.quantity}
                          </Text>
                        </View>
                        <View
                          style={tw.style(
                            `flex-2 border-r border-gray-200 items-center py-2`
                          )}
                        >
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black  text-center`),
                            ]}
                          >
                            {item.retailPrice}
                          </Text>
                        </View>
                        <View style={tw.style(`flex-2  items-center py-2`)}>
                          <Text
                            style={[
                              { fontFamily: 'SF_bold' },
                              tw.style(`text-black text-thin text-sm `),
                            ]}
                          >
                            {item.quantity * item.retailPrice}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
              </View>
              <PayableAmount custom custom_order={custom_order} />
            </>
          )}

          <PayableAmount summery order_summery={order_summery} />
        </ScrollView>
        <View style={tw.style(`w-52 mx-auto my-4`)}>
          <CustomButton
            color='red'
            title='Pay Now'
            onPress={() => paymentHandler()}
          />
        </View>
      </FormWrapper>
    </Wrapper>
  );
};

export default OrderSummaryCart;
