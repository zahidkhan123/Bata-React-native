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
import EditIcon from '../assets/images/ic_edit.svg';

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
  customOrderRemoveFromCart,
  removeFromCart,
} from '../redux/actions/cartAction';

const CustomOrderProductCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state?.userLogin);

  const catalog = useSelector((state) => state.catlog);
  const { catlog } = catalog;
  const { UserName } = userInfo?.userInfo?.data;
  const suggestedProducts = useSelector((state) => state?.suggestedProducts);
  const orderNo = suggestedProducts?.products?.data.orderNo;
  const [bgQuantity, setBgQuantity] = useState('bg-red-600 bg-opacity-25');
  const [totalQuantity, setTotalQuantity] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [orderProducts, setOrderProducts] = useState(null);
  const customCart = useSelector((state) => state?.customCart?.customCartItem);
  // const [quantity, setQuantity] = useState(null);

  const [newProduct, setNewProduct] = useState(null);
  const cartItem = useSelector((state) => state?.cart.cartItem);
  // const { product, productDetail } = customCart;
  // useEffect(() => {
  //   let quantityArray = [];
  //   customCart?.forEach((item) => {
  //     item?.product_sizes?.forEach((quan) => {
  //       let quantity = quan.defaultQuantity;
  //
  //       quantityArray.push(quantity);
  //     });

  //     if (quantityArray.length > 0) {
  //       let addedQuantity = quantityArray?.reduce((curr, next) => curr + next);
  //
  //       setTotalQuantity(addedQuantity);
  //     }
  //   });
  // }, [customCart]);

  //

  // useEffect(() => {
  //   let updatedProduct = [];

  //   catlog.map((item) => {
  //     if (item.article.articleNo === singleArticle) {
  //       return updatedProduct?.push({
  //         ...item,
  //         product_sizes: customCart,
  //       });
  //     }
  //   });
  //
  //   setNewProduct(newProduct);
  // }, [singleArticle]);

  // useEffect(() => {
  //   let custom_products = [];

  //   if (customCart.length > 0) {
  //     customCart?.map((item, index) => {
  //       custom_products?.push({
  //         serialNo: index + 1,
  //         articleNo: item.article.articleNo,
  //         product_sizes: item.product_sizes,
  //       });
  //     });

  //     setCustomProducts(custom_products);
  //   }
  // }, [customCart]);

  //object for both custom and suggested order checkout api

  const onDeleteHandler = (article) => {
    dispatch(customOrderRemoveFromCart(article));
  };

  return (
    <ScrollView style={tw.style(`mt-2`)}>
      <View>
        {customCart.length > 0 ? (
          customCart &&
          customCart?.map((item, ind) => (
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
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-base uppercase font-bold`),
                        ]}
                      >
                        {item?.article.brand.name} -{' '}
                        {/* {/ {item?.category.categoryGroup.name} /} */}
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
                    style={tw.style(`absolute right-3 top-3`)}
                  >
                    <DelIcon />
                  </Pressable>
                  {/* <Pressable
                    onPress={() => onDeleteHandler(item?.article.articleNo)}
                    style={tw.style(`absolute right-3 top-2`)}
                  >
                    <DelIcon />
                  </Pressable> */}

                  <View
                    style={tw.style(`pb-2 flex-row justify-between items-end`)}
                  >
                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-light-blue uppercase text-xs`),
                      ]}
                    >
                      {/* Total qty: {quantity} */}
                    </Text>
                    <Pressable
                      onPress={() => {
                        navigation.navigate('CustomEditOrder', {
                          product: item,
                          article: item?.article?.articleNo,
                          page: 'Catalog',
                        });
                      }}
                    >
                      <View style={tw.style(`items-center mb-2`)}>
                        <EditIcon />
                      </View>
                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`text-red-500 uppercase text-xs`),
                        ]}
                      >
                        Edit Order
                      </Text>
                    </Pressable>
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
                      {item?.product_sizes?.map((item, ind) => {
                        return (
                          <View key={item.id}>
                            {item.size !== '-' && (
                              <ScrollView
                                overScrollMode='never'
                                style={tw.style(`border-gray-200`)}
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
                                    {item.defaultQuantity}
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
          <View style={tw.style(`items-center my-auto`)}>
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
              Please add your custom product from catalog
            </Text>
            <View style={tw.style(`w-1/2 mx-auto mt-4`)}>
              <CustomButton
                title='Add Products'
                onPress={() => navigation.navigate('Catalog')}
              />
            </View>
          </View>
        )}
        {/* {customCart.length && (
          <View>
            <Text>Please Add Item into the Cart</Text>
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

export default CustomOrderProductCard;
{
  /* <View style={tw.style("ml-1 mt-3")}>
<Text>Please add product into the cart</Text>
</View> */
}
