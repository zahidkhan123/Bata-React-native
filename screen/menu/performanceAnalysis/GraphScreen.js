import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import { LineChart } from "react-native-charts-wrapper";
// components
import Wrapper from '../../../components/Wrapper';
import { BarChart } from 'react-native-gifted-charts';
import CardWrapper from '../../../components/CardWrapper';
import GraphView from './GraphView';
const { width } = Dimensions.get('window');

// Images
import backIcon from '../../../assets/images/backIcon.svg';
import IconFilter from '../../../assets/images/menu/Icon_filter.svg';
//import tw from 'tailwind-react-native-classnames';
import tw from '../../../common/themeTailwind';

import CloseIcon from '../../../assets/images/close.svg';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const GraphScreen = ({ navigation }) => {
  const Graph = useSelector((state) => state?.graphChart);
  const { loading } = Graph;

  const Primary_Sales = Graph?.graphChart?.data?.primary_sales_pairs;
  const Primary_Sales_Ly =
    Primary_Sales && !loading ? Primary_Sales?.map((item) => item?.ly) : '';

  const Primary_Sales_Est =
    Primary_Sales && !loading ? Primary_Sales?.map((item) => item?.est) : '';
  const Primary_Sales_Act =
    Primary_Sales && !loading ? Primary_Sales?.map((item) => item?.act) : '';
  const Primary_Sales_Lab =
    Primary_Sales && !loading ? Primary_Sales?.map((item) => item?.label) : '';

  const Primary_Turn = Graph?.graphChart?.data?.primary_sales_net_turn_over;

  const Primary_Turn_Ly =
    Primary_Turn && !loading ? Primary_Turn?.map((item) => item?.ly) : '';
  const Primary_Turn_Est =
    Primary_Turn && !loading ? Primary_Turn?.map((item) => item?.est) : '';
  const Primary_Turn_Act =
    Primary_Turn && !loading ? Primary_Turn?.map((item) => item?.act) : '';
  const Primary_Turn_Lab =
    Primary_Turn && !loading ? Primary_Turn?.map((item) => item?.label) : '';

  const Monthly_Sales = Graph?.graphChart?.data?.monthly_sale_purchase;
  const Monthly_Sales_sale =
    Monthly_Sales && !loading ? Monthly_Sales?.map((item) => item?.sale) : '';
  const Monthly_Sales_purchase =
    Monthly_Sales && !loading
      ? Monthly_Sales.map((item) => item?.purchase)
      : '';
  const Monthly_Sales_stock =
    Monthly_Sales && !loading ? Monthly_Sales?.map((item) => item?.stock) : '';
  const Monthly_Sales_Lab =
    Monthly_Sales && !loading ? Monthly_Sales?.map((item) => item?.label) : '';

  //  console.log(Primary_Sales);

  var Prime_Sales_Data = [
    Primary_Sales_Ly,
    Primary_Sales_Act,
    Primary_Sales_Est,
  ];
  function getMax(a) {
    return Math.max(...a.map((e) => (Array.isArray(e) ? getMax(e) : e)));
  }
  const Max_Value_Prime = getMax(Prime_Sales_Data);
  const Prime_Sales_Max_Value =
    Max_Value_Prime && !loading ? Max_Value_Prime : '';

  function getMin(a) {
    return Math.min(...a.map((e) => (Array.isArray(e) ? getMin(e) : e)));
  }
  const Min_Value_Prime = getMin(Prime_Sales_Data);
  const Prime_Sales_Min_Value =
    Min_Value_Prime && !loading ? Min_Value_Prime : '';

  const Total_value_Sales = Prime_Sales_Max_Value + Prime_Sales_Min_Value;

  var Prime_Turn_Data = [Primary_Turn_Ly, Primary_Turn_Act, Primary_Turn_Est];

  const Max_Value_Turn = getMax(Prime_Turn_Data);
  const Prime_Turn_Max_Value = Max_Value_Turn && !loading ? Max_Value_Turn : '';

  const Min_Value_Turn = getMin(Prime_Turn_Data);
  const Prime_Turn_Min_Value = Min_Value_Turn && !loading ? Min_Value_Turn : '';

  const Total_value_Turn = Prime_Turn_Max_Value + Prime_Turn_Min_Value;

  const Max_Value_Monthly_stock = getMax([Monthly_Sales_stock]);
  const Monthly_sales_Max_Stock_Value =
    Max_Value_Monthly_stock && !loading ? Max_Value_Monthly_stock : '';
  // console.log(Monthly_sales_Max_Stock_Value);
  const Max_Value_Monthly_sale = getMax([Monthly_Sales_sale]);
  const Monthly_sales_Max_Sale_Value =
    Max_Value_Monthly_sale && !loading ? Max_Value_Monthly_sale : '';
  // console.log(Monthly_sales_Max_Sale_Value);
  const Max_Value_Monthly_purchase = getMax([Monthly_Sales_purchase]);
  const Monthly_sales_Max_Purchase_Value =
    Max_Value_Monthly_purchase && !loading ? Max_Value_Monthly_purchase : '';
  // console.log(Monthly_sales_Max_Purchase_Value);
  const Total_value_Month =
    Monthly_sales_Max_Stock_Value +
    Monthly_sales_Max_Sale_Value +
    Monthly_sales_Max_Purchase_Value;
  // console.log(Total_value_Month);

  const PrimarySalesPairs = [
    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[0] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[0] : '',
      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[0] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[0] : '',
      frontColor: '#ec6666',
    },

    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[1] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[1] : '',
      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[1] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[1] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[2] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[2] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[2] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[2] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[3] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[3] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[3] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[3] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[4] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[4] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[4] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[4] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Sales_Ly && !loading ? Primary_Sales_Ly[5] : '',
      label: Primary_Sales_Lab && !loading ? Primary_Sales_Lab[5] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Sales_Est && !loading ? Primary_Sales_Est[5] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Sales_Act && !loading ? Primary_Sales_Act[5] : '',
      frontColor: '#ec6666',
    },
  ];

  const PrimaryTurnNet = [
    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[0] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[0] : '',
      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[0] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[0] : '',
      frontColor: '#ec6666',
    },

    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[1] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[1] : '',
      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[1] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[1] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[2] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[2] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[2] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[2] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[3] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[3] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[3] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[3] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[4] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[4] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[4] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[4] : '',
      frontColor: '#ec6666',
    },
    {
      value: Primary_Turn_Ly && !loading ? Primary_Turn_Ly[5] : '',
      label: Primary_Turn_Lab && !loading ? Primary_Turn_Lab[5] : '',

      spacing: 2,
      labelTextStyle: { color: 'black' },
      frontColor: '#79d2de',
    },
    {
      value: Primary_Turn_Est && !loading ? Primary_Turn_Est[5] : '',
      frontColor: '#147AD6',
      spacing: 2,
    },
    {
      value: Primary_Turn_Act && !loading ? Primary_Turn_Act[5] : '',
      frontColor: '#ec6666',
    },
  ];

  const stackDetails = [
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[0] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[0] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[0] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      // label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[0] : '',
      label: 'Jan',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[1] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[1] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[1] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[1] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[2] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[2] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[2] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[2] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[3] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[3] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[3] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[3] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[4] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[4] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[4] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[4] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[5] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[5] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[5] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[5] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[6] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[6] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[6] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[6] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[7] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[7] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[7] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[7] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[8] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[8] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[8] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[8] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading ? Monthly_Sales_purchase[9] : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[9] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[9] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[9] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading
              ? Monthly_Sales_purchase[10]
              : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[10] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[10] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[10] : '',
    },
    {
      stacks: [
        {
          value:
            Monthly_Sales_purchase && !loading
              ? Monthly_Sales_purchase[11]
              : '',
          color: '#147ad6',
        },
        {
          value: Monthly_Sales_stock && !loading ? Monthly_Sales_stock[11] : '',
          color: '#79d2de',
          marginBottom: 1,
        },
        {
          value: Monthly_Sales_sale && !loading ? Monthly_Sales_sale[11] : '',
          color: '#ec6666',
          marginBottom: 1,
        },
      ],
      label: Monthly_Sales_Lab && !loading ? Monthly_Sales_Lab[11] : '',
    },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const showFilterHandler = (value) => {
    setShowFilter(value);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setShowFilter(false);
  };
  return (
    <Wrapper
      navigation={navigation}
      title='Performance Analysis'
      backIcon={backIcon}
      IconFilter={IconFilter}
      showFilter={showFilterHandler}
    >
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(``)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : (
        <>
          <CardWrapper padding margin>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  textAlign: 'center',
                  fontFamily: 'SF_regular',
                }}
              >
                Primary Sales (PAIRS)
              </Text>
            </View>
            <BarChart
              data={PrimarySalesPairs}
              barWidth={8}
              spacing={50}
              roundedTop
              roundedBottom
              initialSpacing={5}
              xAxisThickness={0.5}
              yAxisThickness={0}
              yAxisTextStyle={{ color: 'gray' }}
              noOfSections={10}
              maxValue={Total_value_Sales}
              rulesType='solid'
              width={width - 90}
              labelWidth={60}
              yAxisLabelWidth={55}
            />
            <View style={tw.style(`border-t border-gray-200 my-7 mx-5`)}></View>
            <GraphView />
          </CardWrapper>

          <CardWrapper padding margin>
            <View style={{ marginTop: 50, marginBottom: 20 }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  textAlign: 'center',
                }}
              >
                Primary Sales (Net T.Over)
              </Text>
            </View>
            <BarChart
              data={PrimaryTurnNet}
              barWidth={8}
              spacing={50}
              roundedTop
              roundedBottom
              initialSpacing={5}
              xAxisThickness={0.5}
              yAxisThickness={0}
              yAxisTextStyle={{ color: 'gray' }}
              noOfSections={10}
              maxValue={Total_value_Turn}
              rulesType='solid'
              width={width - 90}
              labelWidth={60}
              yAxisLabelWidth={60}
            />
            <View style={tw.style(`border-t border-gray-200 my-7 mx-5`)}></View>
            <GraphView />
          </CardWrapper>
          <CardWrapper padding margin>
            <View style={{ marginTop: 50, marginBottom: 20 }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 22,
                  textAlign: 'center',
                  width: 300,
                  marginLeft: 10,
                }}
              >
                Monthly Sales , Purchase & Stock Positioning
              </Text>
            </View>
            <BarChart
              stackData={Monthly_Sales && !loading ? stackDetails : ''}
              barWidth={8}
              spacing={45}
              roundedTop
              roundedBottom
              initialSpacing={10}
              xAxisThickness={0.2}
              yAxisThickness={0}
              yAxisTextStyle={{ color: 'gray' }}
              noOfSections={10}
              maxValue={Total_value_Month}
              barBorderRadius={6}
              rulesType='solid'
              width={width - 100}
              yAxisLabelWidth={60}
            />
            <View style={tw.style(`border-t border-gray-200 my-7 mx-5`)}></View>
            <View style={tw.style(`flex flex-row justify-evenly`)}>
              <View style={tw.style(`flex flex-row  items-center `)}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#79D2DE',
                    height: 13,
                    width: 13,
                  }}
                ></View>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-gray ml-2`),
                  ]}
                >
                  Stock
                </Text>
              </View>
              <View style={tw.style(`flex flex-row items-center`)}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#147ad6',
                    height: 13,
                    width: 13,
                  }}
                ></View>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-gray ml-2`),
                  ]}
                >
                  Purchase
                </Text>
              </View>
              <View style={tw.style(`flex flex-row items-center`)}>
                <View
                  style={{
                    borderRadius: 20,
                    backgroundColor: '#ec6666',
                    height: 13,
                    width: 13,
                  }}
                ></View>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-gray ml-2`),
                  ]}
                >
                  Sale
                </Text>
              </View>
            </View>
          </CardWrapper>
        </>
      )}
      {showFilter && (
        <Modal
          animationType='slide'
          transparent={true}
          visible={showFilter}
          onRequestClose={() => {
            setShowFilter(!showFilter);
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
                onPress={() => setShowFilter(!showFilter)}
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
      )}
    </Wrapper>
  );
};

export default GraphScreen;
