import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ActionSheetIOS,
  ScrollView,
} from 'react-native';
import Basket from '../../assets/basket.svg';
import FilterIcon from '../../assets/filter.svg';

// components
import Wrapper from '../../components/Wrapper';
import Model from '../../components/model/CustomModel';
import ProductCard from '../../components/ProductCard';
import ProductCategoryFilter from '../../components/ProductCategoryFilter';
import ProductFilter from '../ProductFilter/index';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../../redux/actions/dashboardAction';
import tw from 'tailwind-react-native-classnames';
import SearchIcon from '../../assets/searchIcon.svg';

import { addToCart, resetCart } from '../../redux/actions/cartAction';
import { orderDetail } from '../../redux/actions/categoryAction';
import { CART_ADD_ITEM } from '../../redux/constants/cartConstants';

const SuggestedOrder = ({ route, navigation }) => {
  const path = route?.params?.path;
  const newData = route?.params?.newData;
  const article = route?.params?.article;
  const order_detail = route?.params?.order_detail;
  const tQuantity = route?.params?.totalQuantity;
  const dispatch = useDispatch();
  const [modelActive, setModelActive] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  // const [getQuantity, setQuantity] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const suggestedProducts = useSelector((state) => state.suggestedProducts);
  const cartItem = useSelector((state) => state.cart.cartItem);

  const products = !loading && suggestedProducts?.products?.data?.products;
  const orderNo = !loading && suggestedProducts?.products?.data?.orderNo;

  const categories = useSelector((state) => state?.category);
  const { loading: FilterLoading } = categories;

  const { loading, error } = suggestedProducts;
  let data;
  if (!loading) {
    data = suggestedProducts?.products;
  }


  useEffect(() => {
    let quantityArray = [];
    cartItem?.forEach((item) => {
      item?.product_sizes?.forEach((quan) => {
        let quantity = quan.quantity;
        quantityArray.push(quantity);
      });
      if (quantityArray.length > 0) {
        let addedQuantity = quantityArray?.reduce((curr, next) => curr + next);
        setTotalQuantity(addedQuantity);
      }
    });
  }, [cartItem, totalPrice, totalQuantity]);
  useEffect(() => {
    if (path === 'editorder') {
      if (order_detail.is_checked) {
        order_detail.product_sizes = newData;
        order_detail.total_quantity = tQuantity;
        dispatch({
          type: CART_ADD_ITEM,
          payload: order_detail,
        });
      }
    }
  }, [newData]);
  useEffect(() => {
    let priceArray = [];
    cartItem?.forEach((item) => {
      let price = item.article.retailPrice;
      let quantity = item.total_quantity;
      let totalPrice;
      if (quantity === 0) {
        totalPrice = price;
      } else {
        totalPrice = price * quantity;
      }
      priceArray.push(totalPrice);
      if (priceArray.length) {
        let newPrice = priceArray?.reduce((curr, next) => curr + next);
        setTotalPrice(newPrice);
      }
    });
  }, [cartItem, totalQuantity, totalPrice]);

  useEffect(() => {
    dispatch(resetCart());
  }, []);

  // useEffect(() => {
  //   setRender(true);
  // }, [render]);
  const [showInput, setShowInput] = useState(false);
  const showInputHandler = (value) => {
    setShowInput(value);
  };

  return (
    <>
      <Wrapper
        title='Suggested Order'
        backIcon
        searchIcon={SearchIcon}
        navigation={navigation}
        search
        showInput={showInputHandler}
      >
        {!loading && !error ? (
          modelActive && (
            <Model
              modalVisible={modelActive}
              setModalVisible={setModelActive}
              title={`Suggested Order Summary`}
              SuggestedOrders
              modalData={data}
            />
          )
        ) : (
          <Text> </Text>
        )}

        {!FilterLoading && (
          <View>
            <ScrollView
              overScrollMode='never'
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ProductCategoryFilter />
            </ScrollView>
          </View>
        )}

        {loading ? (
          <View style={tw.style(`my-auto`)}>
            <ActivityIndicator size='large' color='#ff0000' />
          </View>
        ) : (
          <ProductCard
            navigation={navigation}
            suggestedOrder
            path={path}
            order_detail={order_detail}
            newData={newData}
            article={article}
            tQuantity={tQuantity}
            render={render}
            showInput={showInput}
            route={route}
          />
        )}
      </Wrapper>
      {cartItem.length > 0 && (
        <>
          <Pressable
            onPress={() => navigation.navigate('Cart', { screen: 'cart' })}
            style={tw.style(
              `absolute bottom-0 flex-row justify-between bg-blue-500 w-full items-center p-2 `
            )}
          >
            <View
              style={tw.style(`flex flex-row items-center content-center p-2`)}
            >
              <Basket />
              <View
                style={tw.style(
                  `w-4 h-4 bg-red-600 flex -ml-2 mr-3 text-white z-10 items-center justify-center rounded-full`
                )}
              >
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-white text-xs`),
                  ]}
                >
                  {cartItem?.length}
                </Text>
              </View>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`border-r border-gray-200 mr-2`),
                ]}
              ></Text>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`mr-10 font-bold text-white`),
                ]}
              >
                {totalQuantity}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-white font-bold mr-5`),
                ]}
              >
                Price
              </Text>
              <Text style={{ fontFamily: 'SF_regular' }}>{totalPrice}</Text>
            </View>
          </Pressable>
        </>
      )}
    </>
  );
};

export default SuggestedOrder;
