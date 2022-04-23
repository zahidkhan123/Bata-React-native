import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import CustomButton from './CustomButton';
import Model from '../components/model/CustomModel';
const ReviewOrderTable = ({ product_size, article, order_detail }) => {
  //get state from redux store
  const suggestedProducts = useSelector((state) => state.suggestedProducts);
  const { products, orderNo } = suggestedProducts?.products?.data;
  //artilce from edit order route
  const articleno = article;
  //local states
  const [resetOrder, setResetOrder] = useState(product_size);
  const [order, setOrder] = useState(product_size);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalquantity, setTotalQuantity] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [disable, setDisable] = useState(false);
  //add or subtract handler

  useEffect(() => {
    let quantityArray = [];
    order?.forEach((item) => {
      let quantity = item.quantity;

      quantityArray.push(quantity);

      if (quantityArray.length > 0) {
        let totalQuantity = quantityArray?.reduce((curr, next) => curr + next);

        setTotalQuantity(totalQuantity);
      }
    });
  }, [order, quantity]);

  useEffect(() => {
    getSizes();
  }, []);

  const editHandler = (action, id) => {
    let product = JSON.parse(JSON.stringify(order));

    let item = product.filter((item) => item.id === id);

    if (action === '-') {
      if (item[0].quantity > 0) {
        item[0].quantity = item[0].quantity - 1;
      } else {
        item[0].quantity = item[0].quantity;
      }
    } else {
      quantity.map((quan) => {
        if (id === quan.id) {
          if (item[0].quantity < quan.quantity) {
            // item[0].quantity = item[0].quantity + 2;
            item[0].quantity = item[0].quantity + 1;

            setDisable(false);
          } else {
            item[0].quantity = item[0].quantity;
          }
        }
      });
    }

    setOrder(product);
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

  // useEffect(() => {
  //   products_sizes();
  // }, []);
  // // extract the sizes and quantity data from original products
  // const products_sizes = () => {
  //   let originalProducts = [];
  //   let copyproducts = [...products];
  //   copyproducts.map((item) => {
  //     if (item.article.articleNo === articleno) {
  //       item?.product_sizes?.forEach((elements) => {
  //         originalProducts.push(elements);
  //       });
  //     }
  //   });

  //   setOrder(originalProducts);
  //   setResetOrder(originalProducts);
  // };
  //reset the quantity to default
  const resetHandler = () => {
    setOrder(resetOrder);
  };

  return (
    <View style={tw.style(``)}>
      {modalVisible && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
          title='Product Information'
          editOrderdata={order}
          navigateTo='SuggestedOrder'
          order_detail={order_detail}
          article={article}
          totalquantity={totalquantity}
          editOrder
        />
      )}

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
                    {item.quantity === 0 && (
                      <Text
                        style={[
                          { fontFamily: 'SF_regular' },
                          tw.style(
                            `items-center py-4 justify-center text-gray-400`
                          ),
                        ]}
                      >
                        Out of Stock
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
                      <Text style={tw.style(` text-white text-center`)}>-</Text>
                    </Pressable>
                    <View style={tw.style(`items-center py-2 px-3`)}>
                      <Text
                        style={[
                          { fontFamily: 'SF_bold' },
                          tw.style(` text-center`),
                        ]}
                      >
                        {item.quantity}
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

export default ReviewOrderTable;
