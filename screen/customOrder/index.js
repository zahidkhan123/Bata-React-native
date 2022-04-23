import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import CustomOrderProductCard from '../../components/CustomOrderProductCard';
import Model from '../../components/model/ModelWrapper';
import ProductCard from '../../components/ProductCard';
import SearchIcon from '../../assets/searchIcon.svg';
import Basket from '../../assets/basket.svg';

// components
import Wrapper from '../../components/Wrapper';
import CustomButton from '../../components/CustomButton';

const CustomOrder = ({ navigation }) => {
  const customOrd = useSelector((state) => state.catlog);
  const customCart = useSelector((state) => state.customCart.customCartItem);

  const { loading } = customOrd;
  const [modelActive, setModelActive] = useState(true);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);

  useEffect(() => {
    let quantityArray = [];
    customCart?.forEach((item) => {
      item?.product_sizes?.forEach((quan) => {
        let quantity = quan.defaultQuantity;
        quantityArray.push(quantity);
      });

      if (quantityArray.length > 0) {
        let addedQuantity = quantityArray?.reduce((curr, next) => curr + next);
        setTotalQuantity(addedQuantity);
      }
    });
  }, [customCart, totalPrice]);

  useEffect(() => {
    let priceArray = [];
    customCart?.forEach((item) => {
      let price = item.article.retailPrice;
      let quantity = totalQuantity;

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
  }, [customCart, totalQuantity]);

  return (
    <>
      <Wrapper
        title='Custom Order'
        rightIcon={SearchIcon}
        backIcon
        navigation={navigation}
      >
        {loading ? (
          <View style={tw.style(`my-auto`)}>
            <ActivityIndicator size='large' color='#ff0000' />
          </View>
        ) : (
          <CustomOrderProductCard navigation={navigation} />
        )}
      </Wrapper>
      {customCart.length > 0 && (
        <View
          style={tw.style(
            `absolute bottom-16 flex-row justify-between w-full items-center p-2 `
          )}
        >
          <View style={tw.style(`w-1/2 mx-auto `)}>
            <CustomButton
              title='Add More'
              onPress={() => navigation.navigate('Catalog')}
            />
          </View>
        </View>
      )}

      {customCart.length > 0 && (
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
                  {customCart?.length}
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

export default CustomOrder;
