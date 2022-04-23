import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import DelIcon from '../assets/deleteIcon.svg';
import EmptyBasket from '../assets/empty-basket.svg';
// components
import Wrapper from '../components/Wrapper';
import Model from '../components/model/CustomModel';
import ProductCard from '../components/ProductCard';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../redux/actions/dashboardAction';
import tw from 'tailwind-react-native-classnames';
import CardWrapper from './CardWrapper';
import Tag from './Tag';
import Image from '../assets/images/Image 15.svg';
import CustomButton from './CustomButton';
import { object } from 'prop-types';
import {
  checkoutOrder,
  removeFromCart,
  resetCart,
} from '../redux/actions/cartAction';

const CartSuggestedOrder = ({ route, navigation }) => {
  //   const [modelActive, setModelActive] = useState(true);
  //   const [modalVisible, setModalVisible] = useState(false);
  //   const [render, setRender] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin);

  const { UserName } = userInfo?.userInfo?.data;
  const suggestedProducts = useSelector((state) => state?.suggestedProducts);
  const orderNo = suggestedProducts?.products?.data.orderNo;
  const [bgQuantity, setBgQuantity] = useState('bg-red-600 bg-opacity-25');
  const [suggestProducts, setSuggestProducts] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [customProduts, setCustomProducts] = useState();
  const [modelActive, setModelActive] = useState(false);
  const cartItem = useSelector((state) => state?.cart.cartItem);
  const customCart = useSelector((state) => state?.customCart.customCartItem);

  useEffect(() => {
    let suggested_products = [];

    if (cartItem.length > 0) {
      cartItem?.map((item, index) => {
        suggested_products?.push({
          serialNo: index + 1,
          articleNo: item.article.articleNo,
          product_sizes: item.product_sizes,
        });
      });

      setSuggestProducts(suggested_products);
    }
  }, [cartItem]);

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
  }, [cartItem, totalPrice]);

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
  }, [cartItem, totalQuantity]);

  useEffect(() => {
    let custom_products = [];

    if (customCart.length > 0) {
      customCart?.map((item, index) => {
        custom_products?.push({
          serialNo: index + 1,
          articleNo: item.article.articleNo,
          product_sizes: item.product_sizes,
        });
      });

      setCustomProducts(custom_products);
    }
  }, [customCart]);

  //object when suggested order selected but custom order not selected for checkout api
  const suggestedCheckout = {
    suggested_order: {
      orderNo: orderNo,
      storeNo: UserName,
      order_products: suggestProducts,
    },
    custom_order: {
      orderNo: 0,
      storeNo: 0,
      order_products: [
        {
          serialNo: 0,
          articleNo: 'string',
          product_sizes: [
            {
              id: 0,
              size: 'string',
              quantity: 0,
            },
          ],
        },
      ],
    },
  };

  //object when custom order selected but suggested order not selected for checkout api
  const customCheckout = {
    suggested_order: {
      orderNo: 0,
      storeNo: 0,
      order_products: [
        {
          serialNo: 0,
          articleNo: 'string',
          product_sizes: [
            {
              id: 0,
              size: 'string',
              quantity: 0,
            },
          ],
        },
      ],
    },
    custom_order: {
      orderNo: orderNo,
      storeNo: UserName,
      order_products: customProduts,
    },
  };

  //object for both custom and suggested order checkout api
  const custom_suggested = {
    suggested_order: {
      orderNo: orderNo,
      storeNo: UserName,
      order_products: suggestProducts,
    },
    custom_order: {
      orderNo: orderNo,
      storeNo: UserName,
      order_products: customProduts,
    },
  };

  const checkoutHandler = () => {
    if (totalQuantity > 36) {
      if (cartItem.length > 0 && customCart.length <= 0) {
        dispatch(checkoutOrder(suggestedCheckout, navigation));
      } else if (customCart.length > 0 && cartItem <= 0) {
        dispatch(checkoutOrder(customCheckout, navigation));
      } else {
        dispatch(checkoutOrder(custom_suggested, navigation));
      }
    } else {
      setModelActive(true);
    }
  };
  const onDeleteHandler = (article) => {
    dispatch(removeFromCart(article));
  };
  return (
    <ScrollView style={tw.style(`mt-2`)}>
      {modelActive && (
        <Model
          modalVisible={modelActive}
          setModalVisible={setModelActive}
          title={`To proceed the order, minimum 36 pairs must be ordered.`}
          checkoutOrderPopup
        />
      )}
      <View>
        {cartItem.length > 0 ? (
          cartItem &&
          cartItem?.map((item, ind) => (
            <>
              <View key={ind + 1}>
                <CardWrapper style='relative' padding>
                  <Tag style='left-3' title={item?.article?.profile} />

                  <View style={tw.style(`flex-row  items-center`)}>
                    <View style={tw.style(`pr-4`)}>
                      <Image />
                    </View>

                    <View>
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(`text-base uppercase `),
                        ]}
                      >
                        {item?.article.brand.name} -{' '}
                        {/* {item?.category.categoryGroup.name} */}
                      </Text>

                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-light-blue text-sm py-1`),
                        ]}
                      >
                        <Text
                          style={[
                            { fontFamily: 'SF_regular' },
                            tw.style(`text-black`),
                          ]}
                        >
                          Article #:{' '}
                        </Text>
                        {item?.article.articleNo}
                      </Text>

                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-sm pb-1`),
                        ]}
                      >
                        CAT: {item?.article.category.name}
                      </Text>

                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-sm text-black`),
                        ]}
                      >
                        Retail Price: {item?.article.retailPrice}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    onPress={() => onDeleteHandler(item?.article.articleNo)}
                    style={tw.style(`absolute right-3 top-2`)}
                  >
                    <DelIcon />
                  </Pressable>

                  <View
                    style={tw.style(`pb-2 flex-row justify-between items-end`)}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-light-blue uppercase text-xs`),
                      ]}
                    >
                      Total qty: {item.total_quantity}
                    </Text>
                  </View>
                  <View
                    style={tw.style(
                      `flex-row items-center rounded-lg  border-2 border-gray-200 `
                    )}
                  >
                    <View
                      style={tw.style(
                        `flex items-center text-xs  border-r-2 border-gray-200 h-full`
                      )}
                    >
                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`flex-1 py-1 px-1  `),
                        ]}
                      >
                        Size
                      </Text>

                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(
                            `flex-1 py-1 border-t-2  px-1 border-gray-200`
                          ),
                        ]}
                      >
                        Quantity
                      </Text>
                    </View>
                    <ScrollView
                      overScrollMode='never'
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {item?.product_sizes.map((item, ind) => {
                        return (
                          <View key={item.id}>
                            {item.size !== '-' && (
                              <ScrollView
                                overScrollMode='never'
                                style={tw.style(`   border-gray-200`)}
                                key={ind}
                              >
                                <View
                                  style={tw.style(
                                    ` text-xs border-r-2 border-gray-200 py-1  px-3`
                                  )}
                                >
                                  <Text style={{ fontFamily: 'SF_regular' }}>
                                    {item.size}
                                  </Text>
                                </View>
                                <View
                                  style={tw.style(
                                    ` text-xs border-r-2 border-t-2 border-gray-200 py-1 px-3  border-smoke ${
                                      item.quantity === 0
                                        ? bgQuantity
                                        : 'bg-white'
                                    } `
                                  )}
                                >
                                  <Text style={{ fontFamily: 'SF_regular' }}>
                                    {item.quantity}
                                  </Text>
                                </View>
                              </ScrollView>
                            )}
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                </CardWrapper>
              </View>
            </>
          ))
        ) : (
          <View style={tw.style(`items-center my-16`)}>
            <EmptyBasket />
            <Text
              style={[
                { fontFamily: 'SF_semibold' },
                tw.style(`items-center text-lg my-4`),
              ]}
            >
              It's empty here
            </Text>
            <Text
              style={[
                { fontFamily: 'SF_semibold' },
                tw.style(`items-center text-center text-lg`),
              ]}
            >
              You haven't added any item to your cart yet.
            </Text>
          </View>
        )}
        {/* {cartItem.length && (
          <View>
            <Text>Please Add Item into the Cart</Text>
          </View>
        )} */}
        {cartItem.length > 0 && (
          <>
            <View style={tw.style(``)}>
              <View style={tw.style(`flex-row items-center justify-between`)}>
                <View style={tw.style(`flex-3 items-center py-2 ml-3`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    Total Article
                  </Text>
                </View>
                <View style={tw.style(`  items-center py-2`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    Total pairs
                  </Text>
                </View>
                <View style={tw.style(` items-center py-2 mr-5`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    Net Total
                  </Text>
                </View>
              </View>
            </View>
            <View style={tw.style(`py-3 `)}>
              <View
                style={tw.style(
                  `flex-row border border-red-500 rounded-lg items-center justify-evenly `
                )}
              >
                <View style={tw.style(`flex-1 border-r border-red-500 py-2`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    {cartItem.length}
                  </Text>
                </View>
                <View style={tw.style(`flex-1 border-r border-red-500 py-2`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    {cartItem.length > 0 ? totalQuantity && totalQuantity : 0}
                  </Text>
                </View>
                <View style={tw.style(`flex-1 py-2`)}>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-center`),
                    ]}
                  >
                    {cartItem.length > 0 ? totalPrice && totalPrice : 0}
                  </Text>
                </View>
              </View>
            </View>

            <View style={tw.style(`w-1/2 mx-auto`)}>
              <CustomButton
                title='Checkout'
                onPress={() => checkoutHandler()}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default CartSuggestedOrder;
{
  /* <View style={tw.style("ml-1 mt-3")}>
<Text>Please add product into the cart</Text>
</View> */
}
