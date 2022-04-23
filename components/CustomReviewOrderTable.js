import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import CardWrapper from "./CardWrapper";
import Tag from "./Tag";
import tw from "tailwind-react-native-classnames";
import CloseIcon from "../assets/images/close.svg";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import Model from "../components/model/CustomModel";
import {customOrderAddToCart} from "../redux/actions/cartAction";
import {useNavigation} from "@react-navigation/core";
const CustomReviewOrderTable = ({product_size, article, order_detail}) => {
	//get state from redux store
	
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const catalog = useSelector((state) => state.catlog);
	const products = catalog.catlog;

  
  //artilce from edit order route
  const articleno = article;
  //local states
  const [resetOrder, setResetOrder] = useState(null);
  const [order, setOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [disable, setDisable] = useState(false);
  const [totalquantity, setTotalQuantity] = useState(null);
  const [initialQuantity, setInitialQuantity] = useState(0);
  const [endQuantity, sendEndQuantity] = useState(20);
  
  const [bgQuantity, setBgQuantity] = useState('bg-red bg-opacity-25');
  const [newProduct, setNewProduct] = useState(null);
  //add or subtract handler
  

  useEffect(() => {
    getSizes();
  }, []);
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  const editHandler = (action, id) => {
    let product = JSON.parse(JSON.stringify(order));

    product.forEach((item, index) => {
      if (item.id === id) {
        if (action === '-') {
          if (product[index].defaultQuantity === 0) {
            // Do Nothing
          } else if (product[index].defaultQuantity > 0) {
            // Reduce Quantity by 1
            product[index].defaultQuantity = product[index].defaultQuantity - 1;
          }
        } else if (action === '+') {
          let max_quantity_allowed = endQuantity;
          if (endQuantity < product[index].quantity) {
            max_quantity_allowed = endQuantity;
          } else if (product[index].quantity < endQuantity) {
            max_quantity_allowed = product[index].quantity;
          }

          if (product[index].defaultQuantity < max_quantity_allowed) {
            product[index].defaultQuantity = product[index].defaultQuantity + 1;
          }
        }
      }
    });

    setOrder(product);
  };

  // const getCurrentItem = products.map((item) => {
  //   if (item.article.articleNo === custom_article) {
  //     return;
  //   }
  // });

  useEffect(() => {
    if (article) {
      getItem();
    }
  }, [order]);

  const getItem = () => {
    let updatedProducts = [];
    let product = [...products];

    let item = product.filter((item) => item.article.articleNo === article);

    updatedProducts.push(item);

    let newItem;
    updatedProducts.map((item) => {
      newItem = { ...item[0], product_sizes: order };
      return newItem;
    });

    setNewProduct(newItem);
  };

  const customOrderHandler = () => {
    dispatch(customOrderAddToCart(newProduct, navigation));
  };

  const getSizes = () => {
    let copyProduct = JSON.parse(JSON.stringify(products));

    let getArticle = copyProduct.map((item) => {
      if (article === item.article.articleNo) {
        setQuantity(item.product_sizes);
      }
    });
    return getArticle;
  };

  useEffect(() => {
    products_sizes();
  }, []);
  // extract the sizes and quantity data from original products
  const products_sizes = () => {
    let originalProducts = [];
    let copyproducts = [...products];
    copyproducts.map((item) => {
      if (item.article.articleNo === articleno) {
        item?.product_sizes?.forEach((elements) => {
          let item = { ...elements, defaultQuantity: initialQuantity };
          originalProducts.push(item);
        });
      }
    });

    setOrder(originalProducts);
    setResetOrder(originalProducts);
  };
  useEffect(() => {
    let quantityArray = [];

    order?.forEach((item) => {
      let quantity = item.defaultQuantity;

      quantityArray.push(quantity);

      if (quantityArray.length > 0) {
        let totalQuantity = quantityArray?.reduce((curr, next) => curr + next);

        setTotalQuantity(totalQuantity);
      }
    });
  }, [order]);

  //reset the quantity to default
  const resetHandler = () => {
    setOrder(resetOrder);
  };

  return (
    <View style={tw.style(``)}>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={tw.style(
            'flex-1 flex-start justify-center rounded-xl p-5   bg-black bg-opacity-40'
          )}
        >
          <View style={tw.style(`bg-white rounded-lg`)}>
            <Text
              style={[
                { fontFamily: 'SF_bold' },
                tw.style(`ml-3 text-black pb-3 pt-5 text-lg  `),
              ]}
            >
              Product Information
            </Text>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />
            <CardWrapper style='relative' padding>
              <Tag
                style='right-3 -top-2'
                title={order_detail?.article.profile}
              />
              <Pressable
                // onPress={() => {
                //   let article = {
                //     articleNo: item?.article?.articleNo,
                //   };
                //   dispatch(orderDetail(article));
                //   navigation.navigate('ProductOrderCard', {
                //     itemId: item?.article?.articleNo,
                //   });
                // }}
                style={tw.style(`py-4 flex-row justify-between`)}
              >
                <View style={tw.style(`flex-row flex-2 items-center`)}>
                  <View style={tw.style(`-mt-6`)}>
                    <Text style={tw.style(`text-base uppercase font-bold`)}>
                      {order_detail?.article.brand.name}
                    </Text>

                    <Text style={tw.style(`text-light-blue text-sm py-1`)}>
                      <Text style={tw.style(`text-black`)}>Article #: </Text>
                      {order_detail?.article.articleNo}
                    </Text>

                    <Text style={tw.style(`text-sm pb-1`)}>
                      CAT: {order_detail?.article.category.name}
                    </Text>

                    <Text style={tw.style(`text-sm text-black`)}>
                      Retail Price: {order_detail?.article.retailPrice}
                    </Text>
                  </View>
                </View>
              </Pressable>

              <View style={tw.style(`absolute right-3 top-2`)}></View>
              <View style={tw.style(`pb-2 flex-row justify-between items-end`)}>
                <Text style={tw.style(`text-light-blue uppercase text-xs`)}>
                  Total qty: {totalquantity}
                </Text>

                <Pressable
                // onPress={() => {
                //   let article = {
                //     articleNo: item?.article.articleNo,
                //   };
                //   dispatch(orderDetail(article));
                //   navigation.navigate('EditOrder', {
                //     itemId: item?.article.articleNo,
                //   });
                // }}
                ></Pressable>
              </View>
              <View
                style={tw.style(
                  `flex-row items-center rounded-lg  border-2 border-gray-200 `
                )}
              >
                <View
                  style={tw.style(
                    `flex items-center text-xs border-r-2 px-1 border-gray-200 h-full`
                  )}
                >
                  <Text
                    style={tw.style(
                      `flex-1 py-1 px-2 border-b-2 border-gray-200`
                    )}
                  >
                    Size
                  </Text>

                  <Text style={tw.style(`flex-1 py-1`)}>Quantity</Text>
                </View>
                <ScrollView
                  overScrollMode='never'
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {order &&
                    order?.map((item, ind) => {
                      return (
                        <View key={item.id}>
                          {item.size !== '-' && (
                            <ScrollView
                              overScrollMode='never'
                              style={tw.style(` border-gray-200`)}
                              key={ind + 1}
                            >
                              <View
                                style={tw.style(
                                  ` text-xs border-r-2 py-1 border-b-2 px-3 border-gray-200`
                                )}
                              >
                                <Text>{item.size}</Text>
                              </View>
                              <View
                                style={tw.style(
                                  ` text-xs border-r-2 py-1 px-3  border-gray-200 ${
                                    item.quantity === 0
                                      ? bgQuantity
                                      : 'bg-white'
                                  }`
                                )}
                              >
                                <Text>{item.defaultQuantity}</Text>
                              </View>
                            </ScrollView>
                          )}
                        </View>
                      );
                    })}
                </ScrollView>
              </View>
            </CardWrapper>
            <View style={tw.style(`w-52 mx-auto my-4`)}>
              <CustomButton
                color='red'
                title='Submit Order'
                onPress={() => customOrderHandler()}
              />
            </View>

            <View style={tw.style(`w-52 my-2 mx-auto`)}>
              <CustomButton
                title='Cancel'
                color='black'
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>

      {order &&
        order.map((item, ind) => {
          return (
            <View key={`counter ${ind}`}>
              {item.size !== '-' && (
                <View
                  style={tw.style(
                    `mt-0 pt-0 flex-row border border-gray-300 border-t-0 rounded-b-lg justify-between `
                  )}
                >
                  <View
                    style={tw.style(
                      `flex-row justify-between items-center px-9 py-2`
                    )}
                  >
                    <View style={tw.style(`items-center py-2`)}>
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(` text-center`),
                        ]}
                      >
                        {item.size}
                      </Text>
                    </View>
                  </View>
                  <View>
                    {item.quantity === 0 ? (
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(
                            `items-center py-4 justify-center text-gray-400`
                          ),
                        ]}
                      >
                        Out of Stock
                      </Text>
                    ) : (
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(
                            `items-center py-4 justify-center text-gray-400`
                          ),
                        ]}
                      >
                        {item.quantity}
                      </Text>
                    )}
                  </View>
                  <View
                    style={tw.style(
                      `flex-row justify-between items-center px-3 py-2`
                    )}
                  >
                    <Pressable
                      onPress={() => editHandler('-', item.id, ind)}
                      style={tw.style(
                        ` items-center py-1 px-3 bg-gray-300 rounded-lg`
                      )}
                    >
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(` text-white text-center`),
                        ]}
                      >
                        -
                      </Text>
                    </Pressable>
                    <View style={tw.style(`items-center py-2 px-3`)}>
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(` text-center`),
                        ]}
                      >
                        {item.defaultQuantity}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => editHandler('+', item.id, ind)}
                      style={tw.style(
                        `items-center py-1 px-3 bg-red-600 rounded-lg`
                      )}
                      // disable={item.quantity < parseInt(item.quantity)}
                    >
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(` text-white text-center`),
                        ]}
                      >
                        +
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          );
        })}

      <View style={tw.style(`w-52 mx-auto my-4`)}>
        {totalquantity > 0 && (
          <CustomButton
            color='red'
            title='Review Order'
            onPress={() => setModalVisible(!modalVisible)}
          />
        )}
      </View>

      <View style={tw.style(`w-52 my-2 mx-auto`)}>
        <CustomButton
          title='Reset Order'
          color='black'
          onPress={resetHandler}
        />
      </View>
    </View>
  );
};

export default CustomReviewOrderTable;
