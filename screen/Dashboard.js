import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, View, BackHandler, Alert } from 'react-native';

// Components
import Wrapper from '../components/Wrapper';
import Slider from '../components/HeroSlider';
import Card from '../components/dashboard/Card';

// Images
import Icon from '../assets/images/list.svg';
import Call from '../assets/images/call.svg';
import Suggested_order from '../assets/suggested_order';
import Catalog from '../assets/catalog.svg';
import Orderhistory from '../assets/order_history.svg';

// style / tailwind
import tw from '../common/themeTailwind';
import { childrenStyle } from '../common/style';
import Model from '../components/model/CustomModel';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../redux/actions/dashboardAction';
import { categories, catlog } from '../redux/actions/categoryAction';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catlog);

  const pageNumber = catalog?.paginData?.page;
  const perPage = catalog?.paginData?.per_page;
  const [pageIndex, setPageIndex] = useState(pageNumber);
  const [pageSize, setPageSize] = useState(perPage);
  const [modalVisible, setModalVisible] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;
  const { Roll } = userLogin?.userInfo?.data;
  let UserName;
  if (!loading) {
    UserName = userLogin?.userInfo?.data?.UserName;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    () => handleBackButton.remove();
  }, []);

  const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  const suggestionHanlder = () => {
    if (Roll === 2) {
      setModalVisible(true);
    } else {
      if (UserName) {
        dispatch(
          suggestedProducts({
            outletID: UserName,
            pageIndex: pageIndex || 1,
            pageSize: pageSize || 20,
            category_ids: [],
            brand_ids: [],
          })
        );
        setTimeout(() => {
          dispatch(categories());
        }, 2000);

        navigation.navigate('SuggestedOrder');
      }
    }
  };

  const customHandler = () => {
    if (Roll === 2) {
      setModalVisible(true);
    } else {
      dispatch(
        catlog({
          pageIndex: pageIndex || 1,
          pageSize: pageSize || 20,
          category_ids: null,
          brand_ids: null,
        })
      );
      navigation.navigate('CustomOrder');
    }
  };

  const catlogHandler = () => {
    dispatch(
      catlog({
        pageIndex: pageIndex || 1,
        pageSize: pageSize || 20,
        category_ids: null,
        brand_ids: null,
      })
    );
    dispatch(categories());
    navigation.navigate('Catalog');
  };
  const historyHandler = () => {
    if (Roll === 2) {
      setModalVisible(true);
    } else {
      navigation.navigate('History');
    }
  };
  return (
    <Wrapper navigation={navigation} logo rightIcon={Call}>
      <View style={[tw.style(`justify-around mt-3`), childrenStyle.subChild]}>
        <Slider />
        {modalVisible && (
          <Model
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            title={`Access Denied`}
            SuggestedOrdersOnRoll
          />
        )}
        <View style={tw.style(`flex-row flex-wrap mt-2 justify-between`)}>
          <Pressable onPress={suggestionHanlder}>
            <Card
              Icon={Suggested_order}
              title='Suggested Order'
              style='mt-5 shadow-md'
            />
          </Pressable>

          <Pressable onPress={customHandler}>
            <Card Icon={Icon} title='Custom Order' style='mt-5  shadow-md' />
          </Pressable>
          <Pressable onPress={historyHandler}>
            <Card
              Icon={Orderhistory}
              title='Order History'
              style='mt-2 mb-1  shadow-md'
            />
          </Pressable>
          <Pressable onPress={catlogHandler}>
            <Card Icon={Catalog} title='Catalog' style='mt-2  mb-1 shadow-md' />
          </Pressable>
        </View>
      </View>
    </Wrapper>
  );
};

export default HomeScreen;
