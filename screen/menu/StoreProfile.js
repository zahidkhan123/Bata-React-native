import React, { useEffect } from 'react';
import {
  View,
  Text,
  Svg,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { storeProfileAction } from '../../redux/actions/storeProfileAction';

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
import BataImage from '../../assets/images/menu/MaskGroup5.svg';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

// styles tailwind css
import tw from '../../common/themeTailwind';
const { width } = Dimensions.get('window');
const StoreProfile = ({ navigation }) => {
  const dispatch = useDispatch();

  const storeData = useSelector((state) => state.storeProfile);
  const { loading } = storeData;
  const data = storeData?.profileData?.data;

  // useEffect(() => {
  //   dispatch(storeProfileAction({ outletID: UserName }));
  // }, []);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const dateHandler = (date) => {
    var demoDate = new Date(date);
    var updateDate = demoDate.toUTCString().slice(8, 17);
    return updateDate;
  };
  const Image = [
    { id: '1', image: BataImage },
    { id: '2', image: BataImage },
    { id: '3', image: BataImage },
  ];
  return (
    <Wrapper
      navigation={navigation}
      title='Store Profile'
      backArrow={backArrow}
    >
      {loading ? (
        <View style={tw.style(`my-auto `)}>
          <ActivityIndicator
            style={tw.style(`mt-50`)}
            size='large'
            color='#ff0000'
          />
        </View>
      ) : (
        <View>
          <View style={tw.style(`mt-2`)}>
            <SwiperFlatList
              autoplay
              autoplayDelay={10}
              autoplayLoop
              // loop = {false}
              showPagination
              paginationDefaultColor='white'
              autoplayLoopKeepAnimation
              paginationStyleItemActive={tw.style(
                `bg-transparent border border-white`
              )}
              data={Image}
              renderItem={({ item: Item, key }) => (
                <View
                  key={key}
                  style={[styles.child, tw.style(`items-center pb-1`)]}
                >
                  <Item.image width='345' height='230' />
                </View>
              )}
            />
          </View>

          <FormWrapper onSubmit={onSubmit} style='#FFFFFF'>
            <CustomInput
              control={control}
              errors={errors}
              label='STORE'
              name='store'
              rules={{
                required: 'true',
              }}
              errorMessage='Required Field'
              style='bg-smoke'
              defaultValue={`${data && data?.storeNo} `}
              editable={false}
            />
            <CustomInput
              control={control}
              errors={errors}
              label='CITY PROFILE'
              name='city'
              rules={{
                required: 'true',
              }}
              errorMessage='Required Field'
              // placeholder="Enter City Profile"
              style='bg-smoke text-gray'
              editable={false}
              defaultValue={`${data && data?.cityProfile}`}
            />
            <CustomInput
              control={control}
              errors={errors}
              label='MARKET'
              name='market'
              rules={{
                required: 'true',
              }}
              errorMessage='Required Field'
              // placeholder="Enter Market Profile"
              style='bg-smoke text-dark-gray'
              editable={false}
              defaultValue={`${data && data?.marketProfile}`}
            />

            <CustomLabel title='STORE PROFILE - Size' style='my-3' />
            <CustomTableS
              headOne='Frontage'
              headTwo='Selling'
              headThird='Stock'
              dataOne={data?.StoreSize?.frontage}
              dataTwo={data?.StoreSize?.selling}
              dataThird={data?.StoreSize?.stock}
            />
            <CustomLabel title='STORE PROFILE - Information' style='my-3' />
            <CustomTableS
              headOne='Store Design'
              headTwo='Staff #'
              headThird='Opening Date'
              dataOne={data?.storeInformation?.storeDesign}
              dataTwo={data?.storeInformation?.staff}
              dataThird={dateHandler(data?.storeInformation?.openingDate)}
            />
            <CustomLabel title='BUSINESS PROFILE' style='my-3' />
            <CustomTableL
              title='L.Y. (Actual Business)'
              titleStyle='text-red'
              headOne='Detail'
              headTwo='Primary'
              headThird='Secondary'
              headFour='FWC'
              rowOne_1={data?.businessProfile?.actualBusiness[0].detail}
              rowOne_2={data?.businessProfile?.actualBusiness[0].primary}
              rowOne_3={data?.businessProfile?.actualBusiness[0].secondary}
              rowOne_4={data?.businessProfile?.actualBusiness[0].FWC}
              rowTwo_1={data?.businessProfile?.actualBusiness[1].detail}
              rowTwo_2={data?.businessProfile?.actualBusiness[1].primary}
              rowTwo_3={data?.businessProfile?.actualBusiness[1].secondary}
              rowTwo_4={data?.businessProfile?.actualBusiness[1].FWC}
            />

            <CustomTableL
              title='L.Y. (Business Projection)'
              titleStyle='text-green'
              head_Style='text-green'
              headOne='Detail'
              headTwo='Primary'
              headThird='Secondary'
              rowOne_1={data?.businessProfile?.businessProjection[0].detail}
              rowOne_2={data?.businessProfile?.businessProjection[0].primary}
              rowOne_3={data?.businessProfile?.businessProjection[0].secondary}
              rowTwo_1={data?.businessProfile?.businessProjection[1].detail}
              rowTwo_2={data?.businessProfile?.businessProjection[1].primary}
              rowTwo_3={data?.businessProfile?.businessProjection[1].secondary}
            />
          </FormWrapper>
        </View>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  child: {
    width: width - 48,
    height: '100%',
    // height: 450,
  },
});

export default StoreProfile;
