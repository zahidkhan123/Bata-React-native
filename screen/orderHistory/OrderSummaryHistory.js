import React, { useEffect } from 'react';
import { View, Text, Svg, ActivityIndicator } from 'react-native';
import { useForm } from 'react-hook-form';

// components
import Wrapper from '../../components/Wrapper';
import FormWrapper from '../../components/auth/AuthFormWrapper';
import CustomInput from '../../components/CustomInput';
// menu Components
import CustomTableS from '../../components/menuComponents/CustomTableS';
import CustomLabel from '../../components/menuComponents/CustomLabel';
import CustomTableL from '../../components/menuComponents/CustomTableL';

// images
import backArrow from '../../assets/images/Nevigationbar.svg';

// styles tailwind css
import tw from '../../common/themeTailwind';
import PayableAmount from '../../components/PayableAmount';
import CustomButton from '../../components/CustomButton';
import { useSelector } from 'react-redux';

const OrderSummaryHistory = ({ navigation }) => {
  const summaryData = useSelector((state) => state.summaryHistory);
  const cDate = summaryData?.summaryHistoryInfo?.data?.CreateDate;
  const order_status = summaryData?.summaryHistoryInfo?.data?.order_status;
  const order = summaryData?.summaryHistoryInfo?.data?.order;

  const orderProducts =
    summaryData?.summaryHistoryInfo?.data?.order?.order_products;
  const { loading } = summaryData;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dateConverter = (date) => {
    let dates = new Date(date);
    let updateDate = dates.toDateString();

    return updateDate;
  };
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Wrapper
      navigation={navigation}
      title='Order Summary'
      backArrow={backArrow}
    >
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
          <FormWrapper style='#FFFFFF'>
            <View
              style={tw.style(
                `flex flex-col  my-2  rounded-lg bg-gray-200 py-2 px-1`
              )}
            >
              <View
                style={tw.style(
                  `flex flex-row justify-between items-center my-1  `
                )}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-sm text-center`),
                  ]}
                >
                  Order Status
                </Text>

                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-sm text-center`),
                  ]}
                >
                  {dateConverter(cDate)}
                </Text>
              </View>
              <View
                style={tw.style(
                  `flex flex-row justify-between items-center  my-1 `
                )}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-blue text-sm text-center`),
                  ]}
                >
                  {order_status}
                </Text>

                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-sm  text-center`),
                  ]}
                >
                  05:34PM
                </Text>
              </View>
            </View>
            <View
              style={tw.style(
                `flex flex-row bg-light-blue justify-evenly items-center  rounded-lg p-3`
              )}
            >
              {/* <Text style={tw.style(`text-white text-lg font-bold text-center`)}>
              Suggested Order
            </Text> */}

              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-white text-lg  font-bold  text-center`),
                ]}
              >
                Order Id :
              </Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-red-600 text-lg  font-bold text-center `),
                ]}
              >
                {order?.orderNo}
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
                      { fontFamily: 'SF_semibold' },
                      tw.style(`text-base `),
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
                      { fontFamily: 'SF_semibold' },
                      tw.style(`text-base `),
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
                      { fontFamily: 'SF_semibold' },
                      tw.style(`text-base `),
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
                      { fontFamily: 'SF_semibold' },
                      tw.style(`text-base `),
                    ]}
                  >
                    Price
                  </Text>
                </View>
                <View style={tw.style(`flex-2 items-center py-2`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_semibold' },
                      tw.style(`text-base `),
                    ]}
                  >
                    Value
                  </Text>
                </View>
              </View>
              {orderProducts?.map((item, index) => {
                return (
                  <View
                    key={index}
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
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-sm text-center  `),
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
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-sm text-center  `),
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
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-sm text-center  `),
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
                          { fontFamily: 'SF_regular' },

                          tw.style(`text-sm text-center   `),
                        ]}
                      >
                        {item.retailPrice}
                      </Text>
                    </View>
                    <View style={tw.style(`flex-2 items-center py-2`)}>
                      <Text
                        style={[
                          { fontFamily: 'SF_semibold' },
                          tw.style(`text-sm text-center `),
                        ]}
                      >
                        {item.quantity * item.retailPrice}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <PayableAmount order_summery order={order} />

            {/* <View
            style={tw.style(
              `flex flex-row justify-between bg-light-blue items-center my-3 rounded-lg  p-3`
            )}
          >
            <Text style={tw.style(`text-white text-lg font-bold `)}>
              Custom Order
            </Text>

            <Text style={tw.style(`text-white text-lg font-bold  text-center`)}>
              Order Id:
              <Text
                style={tw.style(`text-red-600 text-lg font-bold   text-center`)}
              >
                22312
              </Text>
            </Text>
          </View>

          <View style={tw.style(`py-3`)}>
            <View style={tw.style(`flex-row border  justify-between`)}>
              <View style={tw.style(`flex-2 border-r items-center py-2`)}>
                <Text style={[{ fontFamily: 'SF_regular' },tw.style(`text-base  text-center`)]}>Sr.#</Text>
              </View>
              <View style={tw.style(`flex-3 border-r items-center py-2`)}>
                <Text style={tw.style(`text-base   text-center`)}>Article</Text>
              </View>
              <View style={tw.style(`flex-3 border-r items-center py-2`)}>
                <Text style={tw.style(`text-base    text-center`)}>
                  Category
                </Text>
              </View>
              <View style={tw.style(`flex-2 border-r items-center py-2`)}>
                <Text style={tw.style(`text-base   text-center`)}>Qty</Text>
              </View>
              <View style={tw.style(`flex-2 items-center py-2`)}>
                <Text style={tw.style(`text-base   text-center`)}>Price</Text>
              </View>
            </View>
            {vendorData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={tw.style(`flex-row border border-t-0 justify-between`)}
                >
                  <View style={tw.style(`flex-2 border-r items-center py-2`)}>
                    <Text style={[{ fontFamily: 'SF_regular' },tw.style(`text-base text-center`)]}>
                      {item.num}
                    </Text>
                  </View>
                  <View style={tw.style(`flex-3 border-r items-center py-2`)}>
                    <Text style={[{ fontFamily: 'SF_regular' },tw.style(`text-base  text-center`)]}>
                      {item.article}
                    </Text>
                  </View>
                  <View style={tw.style(`flex-3 border-r items-center py-2`)}>
                    <Text style={[{ fontFamily: 'SF_regular' },tw.style(`text-base text-center`)]}>
                      {item.category}
                    </Text>
                  </View>
                  <View style={tw.style(`flex-2 border-r items-center py-2`)}>
                    <Text style={[{ fontFamily: 'SF_regular' },tw.style(`text-base  text-center`)]}>
                      {item.qty}
                    </Text>
                  </View>
                  <View style={tw.style(`flex-2  items-center py-2`)}>
                    <Text style={tw.style(`text-base font-bold text-center`)}>
                      {item.price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View> */}

            <PayableAmount />
            <View style={tw.style(`w-52 mx-auto my-4`)}>
              <CustomButton color='red' title='Pay Now' />
            </View>
          </FormWrapper>
        </View>
      )}
    </Wrapper>
  );
};

export default OrderSummaryHistory;
