import React, { useState, useEffect } from 'react';

import {
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  // Image,
  TouchableNativeFeedback,
} from 'react-native';
import CheckBox from 'react-native-check-box';
// components
import CardWrapper from './CardWrapper';
import Tag from './Tag';

// tailwind / style
import tw from '../common/themeTailwind';
import { useDispatch, useSelector } from 'react-redux';
// images
import Image from '../assets/images/Image 15.svg';
import EditIcon from '../assets/images/ic_edit.svg';
import EmptyData from '../assets/empty-data.svg';
import ProductCategoryFilter from './ProductCategoryFilter';
import FilterIcon from '../assets/filter.svg';
import ProductFilter from '../screen/ProductFilter';
import { orderDetail } from '../redux/actions/categoryAction';
import {
  addToCart,
  removeFromCart,
  resetCart,
} from '../redux/actions/cartAction';

import { TextInput } from 'react-native-gesture-handler';

const ProductCard = ({
  children,
  newTag,
  navigation,
  route,
  path,
  order_detail,
  newData,
  article,
  tQuantity,
  render,
  showInput,
}) => {
  //edited data coming from the edit order page

  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const suggestedProducts = useSelector((state) => state.suggestedProducts);
  const products = !loading && suggestedProducts?.products?.data?.products;
  const orderNo = !loading && suggestedProducts?.products?.data?.orderNo;

  // const { products, orderNo } = !loading && suggestedProducts?.products?.data;
  const { loading, error } = suggestedProducts;
  const [bgQuantity, setBgQuantity] = useState('bg-red bg-opacity-25');
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [newProducts, setNewProducts] = useState([]);
  const [is_checked, setIs_Checked] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(null);
  const cartItem = useSelector((state) => state?.cart.cartItem);
  const [masterData, setMasterData] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let updatedProducts = [];

    newProducts?.forEach((single_product) => {
      if (path === 'editorder') {
        if (article === single_product.article.articleNo) {
          updatedProducts.push({
            ...single_product,
            product_sizes: newData,
            total_quantity: tQuantity,
            is_checked: single_product.is_checked,
          });
        } else {
          updatedProducts.push({
            ...single_product,
            is_checked: single_product.is_checked,
          });
        }
      }
    });

    setNewProducts(updatedProducts);
  }, [newData]);

  // useEffect(() => {
  //   if (path === 'editorder') {
  //     let updatedProducts = [];
  //     newProducts.forEach((single_product) => {
  //            updatedProducts.push({
  //             ...single_product,
  //             product_sizes: newData,
  //             total_quantity: tQuantity,
  //             isCheckedAll,
  //             is_checked,
  //           });

  //       updatedProducts.push({ ...single_product, is_checked });
  //     });
  //   }
  // }, [])

  useEffect(() => {
    const allProducts = newProducts?.map((item) => {
      let new_item = { ...item };

      if (isCheckedAll) {
        // It is unchecked. We are here to check them all
        if (item.is_checked) {
          // It is already checked. Don't do anything
        } else if (item.is_checked === false) {
          // It is unchecked, so check it
          new_item = { ...item, is_checked: true };
          dispatch(addToCart(new_item, new_item.article.articleNo));
        }
      } else if (isCheckedAll === false) {
        // All Checkbox is already selected and we are here to uncheck them all
        if (item.is_checked) {
          // It is checked. Uncheck it
          new_item = { ...item, is_checked: false };
          dispatch(removeFromCart(new_item.article.articleNo));
        } else if (item.is_checked === false) {
          // It is already unchecked. Don't do anything
        }
      }

      return new_item;
    });

    setNewProducts(allProducts);
  }, [isCheckedAll]);

  useEffect(() => {
    let updatedProducts = [];
    if (products) {
      products?.map((product) => {
        updatedProducts.push({ ...product, is_checked });
      });
    }
    setNewProducts(updatedProducts);
    setMasterData(updatedProducts);
  }, [products]);

  const singleCheckedHandler = (id, checked) => {
    let productData = newProducts?.map((item) => {
      if (id === item.article.articleNo) {
        let newItem = { ...item, is_checked: !checked };

        if (newItem.is_checked) {
          dispatch(addToCart(newItem, newItem.article.articleNo));
        } else {
          dispatch(removeFromCart(newItem.article.articleNo));
        }

        return newItem;
      }
      return item;
    });

    setNewProducts(productData);
  };

  // useEffect(() => {
  //   if(cartItem.length <=0){

  //   }
  // },[])

  const check_if_checked = (item) => {
    if (route?.name === 'SuggestedOrder' && cartItem.length === 0) {
      return false;
    }

    return item.is_checked;
  };

  const allCheckedHandler = () => {
    setIsCheckedAll(!isCheckedAll);
  };

  useEffect(() => {
    let quantityArray = [];
    newProducts?.forEach((item) => {
      if (item.article.articleNo === article)
        item?.product_sizes?.forEach((quan) => {
          let quantity = quan.defaultQuantity;

          quantityArray.push(quantity);
        });

      if (quantityArray.length > 0) {
        let addedQuantity = quantityArray?.reduce((curr, next) => curr + next);

        setTotalQuantity(addedQuantity);
      }
    });
  }, [newProducts]);

  const searchFilter = (text) => {
    let fitlerData = JSON.parse(JSON.stringify(newProducts));
    // let masterData = [...newProducts];

    if (text) {
      const newData = fitlerData.filter((item) => {
        const itemData = item?.article?.category?.name
          ? item?.article?.category?.name.toUpperCase()
          : 'No Product Found '.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      const newData1 = fitlerData.filter((item) => {
        const itemData1 = item?.article?.articleNo
          ? item?.article?.articleNo
          : 'No Product Found ';
        const textData = text;
        return itemData1.indexOf(textData) > -1;
      });
      setNewProducts(newData);
      setNewProducts(newData1);
      setSearch(text);
    } else {
      setSearch('');
      setNewProducts(masterData);
    }
  };
  return (
    <>
      {showInput && (
        <TextInput
          style={tw.style(
            `h-10 rounded-xl my-5 pl-5 bg-white border border-gray-200 `
          )}
          value={search}
          placeholder='Search Here'
          underlineColorAndroid='transparent'
          onChangeText={(text) => searchFilter(text)}
          autoFocus={true}
        />
      )}
      {error ? (
        <View>
          <Text style={{ fontFamily: 'SF_regular' }}>
            No suggested order found
          </Text>
        </View>
      ) : (
        <View style={tw.style(`mb-16`)}>
          {!showInput && (
            <View>
              <View
                style={tw.style(
                  `flex flex-row justify-between mt-3 bg-gray-300 w-full items-center p-2 rounded-md `
                )}
              >
                <Text style={[{ fontFamily: 'SF_regular' }, tw.style(``)]}>
                  Order Id:{orderNo}
                </Text>
                <FilterIcon
                  onPress={() => navigation.navigate('ProductFilter')}
                />
              </View>
              {products?.length > 0 && !loading && (
                <View
                  style={tw.style(
                    `flex flex-row justify-between mt-3 px-3 bg-transparent w-full items-center  rounded-md `
                  )}
                >
                  <Text style={[{ fontFamily: 'SF_regular' }, tw.style(``)]}>
                    Select All
                  </Text>

                  <CheckBox
                    onClick={() => allCheckedHandler()}
                    isChecked={isCheckedAll}
                    checkedCheckBoxColor='red'
                    uncheckedCheckBoxColor='black'
                  />
                </View>
              )}
            </View>
          )}
          {!loading && products.length === 0 && (
            <View
              style={tw.style(
                `flex justify-center items-center my-auto h-full`
              )}
            >
              <EmptyData />
            </View>
          )}

          {products &&
            newProducts?.map((item, ind) => (
              <View key={ind + 1}>
                <CardWrapper style='relative' padding>
                  <Tag style='left-3' title={item?.article?.profile} />
                  <Pressable
                    onPress={() => {
                      let article = {
                        articleNo: item?.article?.articleNo,
                      };
                      dispatch(orderDetail(article));
                      navigation.navigate('ProductOrderCard', {
                        itemId: item?.article?.articleNo,
                      });
                    }}
                    style={tw.style(`py-4 flex-row justify-between`)}
                  >
                    <View style={tw.style(`flex-row flex-2 items-center`)}>
                      <View style={tw.style(`pr-4`)}>
                        {/* <Image
                          source={{
                            uri: item?.article?.product_images?.slice(0, 2).url,
                          }}
                          style={tw.style(`h-20 w-20 `)}
                        /> */}
                        <Image />
                      </View>

                      <View>
                        <Text
                          style={[
                            { fontFamily: 'SF_bold' },
                            tw.style(`text-base uppercase`),
                          ]}
                        >
                          {item?.article.brand.name} -{' '}
                          {/* {/ {item?.category.categoryGroup.name} /} */}
                        </Text>

                        <Text style={tw.style(`text-light-blue text-sm py-1`)}>
                          <Text
                            style={[
                              { fontFamily: 'SF_regular' },
                              tw.style(`text-black`),
                            ]}
                          >
                            Article #:
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
                  </Pressable>

                  <View style={tw.style(`absolute right-3 top-2`)}>
                    <CheckBox
                      onClick={() =>
                        singleCheckedHandler(
                          item.article.articleNo,
                          item.is_checked
                        )
                      }
                      isChecked={check_if_checked(item)}
                      checkedCheckBoxColor='red'
                      uncheckedCheckBoxColor='black'
                    />
                  </View>

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

                    <Pressable
                      onPress={() => {
                        navigation.navigate('EditOrder', {
                          product: item,
                          article: item?.article?.articleNo,
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
                      `flex-row items-center rounded-lg  border-2 border-smoke `
                    )}
                  >
                    <View
                      style={tw.style(
                        `flex items-center text-xs border-r-2 px-1 border-smoke h-full`
                      )}
                    >
                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`flex-1 py-1 px-2 border-b-2 border-smoke`),
                        ]}
                      >
                        Size
                      </Text>

                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(`flex-1 py-1`),
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
                                style={tw.style(` border-smoke`)}
                                key={ind + 1}
                              >
                                <View
                                  style={tw.style(
                                    ` text-xs border-r-2 py-1 border-b-2 px-3 border-smoke`
                                  )}
                                >
                                  <Text style={{ fontFamily: 'SF_regular' }}>
                                    {item.size}
                                  </Text>
                                </View>
                                <View
                                  style={tw.style(
                                    ` text-xs border-r-2 py-1 px-3  border-smoke ${
                                      item.quantity === 0
                                        ? bgQuantity
                                        : 'bg-white'
                                    }`
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
            ))}
        </View>
      )}
    </>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cart: {
    backgroundColor: 'red',
  },
});

ProductCard.defaultProps = {
  newTag: true,
};
