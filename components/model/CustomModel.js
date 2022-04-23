import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import PropTypes from 'prop-types';
// Component
import ModelWrapper from './ModelWrapper';
import CheckBox from 'react-native-check-box';
// Style / Tailwind
import tw from '../../common/themeTailwind';
import { useSelector } from 'react-redux';

import { ledgerAction } from '../../redux/actions/ledgerAction';
// Images
import SuccessIcon from '../../assets/images/sucess-vector.svg';
import ErrorIcon from '../../assets/error.svg';
import InfoIcon from '../../assets/ic_warning.svg';
import SuggestedNotepad from '../../assets/suggested_order_notepad.svg';
import BellIcon from '../../assets/icon-bell.svg';
import { useDispatch } from 'react-redux';
import CardWrapper from '../CardWrapper';
import Tag from '../Tag';
import CustomInput from '../CustomInput';
import { useForm } from 'react-hook-form';
import CustomButton from '../CustomButton';

const CustomModel = ({
  modalVisible,
  setModalVisible,
  navigateTo,
  title,
  titleBold,
  success,
  error,
  info,
  SuggestedOrders,
  modalData,
  editOrder,
  editOrderdata,
  order_detail,
  article,
  Feedback,
  btnText,
  editOrderPopup,
  checkoutOrderPopup,
  catData,
  categoryName,
}) => {
  const [cat, setCat] = useState([]);
  const categories = useSelector((state) => state.category);
  const [totalquantity, setTotalQuantity] = useState(null);
  const [bgQuantity, setBgQuantity] = useState('bg-red bg-opacity-25');
  const { loading } = categories;
  const [isCheckedItem, setIsCheckedItem] = useState(false);
  const [catIDs, setCatIDs] = useState([]);
  useEffect(() => {
    let quantityArray = [];

    editOrderdata?.forEach((item) => {
      let quantity = item.quantity;

      quantityArray.push(quantity);

      if (quantityArray.length > 0) {
        let totalQuantity = quantityArray?.reduce((curr, next) => curr + next);

        setTotalQuantity(totalQuantity);
      }
    });
  }, [editOrderdata]);

  useEffect(() => {
    let catgData = [];
    if (catData?.length) {
      catData.forEach((single_cat_data) => {
        if (single_cat_data.name === categoryName) {
          single_cat_data.categories.forEach((item) => {
            catgData.push({ ...item, isCheckedItem });
          });
        }
      });
    }
    setCat(catgData);
  }, [catData]);

  const handleCheckBoxes = (id) => {
    setCatIDs([...catIDs, id]);
    let temp = cat.map((item) => {
      if (id === item.code) {
        return { ...item, isCheckedItem: !item.isCheckedItem };
      }
      return item;
    });
    setCat(temp);
  };

  return (
    <ModelWrapper
      modalVisible={modalVisible}
      navigateTo={navigateTo}
      setModalVisible={setModalVisible}
      editOrder
      editOrderdata={editOrderdata}
      order_detail={order_detail}
      article={article}
      btnText={btnText}
      totalquantity={totalquantity}
      categoryIDs={catIDs}
    >
      <View>
        <View style={tw.style(`pb-10 mx-auto`)}>
          {success && <SuccessIcon />}
          {error && <ErrorIcon />}
          {info && <InfoIcon />}
          {SuggestedOrders && <SuggestedNotepad />}
          {Feedback && <SuccessIcon />}
          {editOrderPopup && <BellIcon />}
          {checkoutOrderPopup && <BellIcon />}
        </View>

        {error && (
          <View style={tw.style('pb-12')}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${titleBold && 'font-normal'} text-center text-lg leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
          </View>
        )}

        {editOrderPopup && (
          <View style={tw.style('pb-12')}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${
                    titleBold && 'font-normal'
                  } text-center text-base leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        {checkoutOrderPopup && (
          <View style={tw.style('pb-12')}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${
                    titleBold && 'font-normal'
                  } text-center text-base leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        {Feedback && (
          <View style={tw.style('pb-12')}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${titleBold && 'font-normal'} text-center text-lg leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
          </View>
        )}
        {success && (
          <View style={tw.style('pb-12')}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${titleBold && 'font-normal'} text-center text-lg leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
          </View>
        )}

        {SuggestedOrders && (
          <View style={tw.style(`pb-12`)}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${titleBold && 'font-bold'} text-center text-lg leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
            {modalData && (
              <>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`font-bold text-center text-lg leading-7`),
                  ]}
                >
                  ID:{modalData.data.orderNo}
                </Text>

                <View
                  style={tw.style(
                    'flex-row justify-between items-center mt-10'
                  )}
                >
                  <Text style={styles.tdList}>Total Articles</Text>
                  <Text style={styles.tdList}>
                    {modalData.data.total_products}
                  </Text>
                </View>
                <View
                  style={tw.style('flex-row justify-between items-center mt-4')}
                >
                  <Text style={styles.tdList}>Total Pairs</Text>
                  <Text style={styles.tdList}>
                    {modalData.data.total_pairs}
                  </Text>
                </View>
                <View
                  style={tw.style('flex-row justify-between items-center mt-4')}
                >
                  <Text style={styles.tdList}>Net Total</Text>
                  <Text style={styles.tdList}>{modalData.data.net_total}</Text>
                </View>
              </>
            )}
          </View>
        )}

        {catData && (
          <View style={tw.style(`pb-12`)}>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${
                    titleBold && 'font-bold'
                  }  mr-20 text-left text-lg leading-7 `
                ),
              ]}
            >
              {title}
            </Text>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />
            {loading ? (
              <View style={tw.style(`my-auto`)}>
                <ActivityIndicator size='large' color='#ff0000' />
              </View>
            ) : (
              catData &&
              cat.map((item) => {
                return (
                  <View
                    key={item.code}
                    style={tw.style('flex-row items-center mt-3')}
                  >
                    {loading ? (
                      <View style={tw.style(`my-auto`)}>
                        <ActivityIndicator size='large' color='#ff0000' />
                      </View>
                    ) : (
                      <>
                        <CheckBox
                          style={{ flex: 1, padding: 10 }}
                          onClick={() => handleCheckBoxes(item.code)}
                          isChecked={item.isCheckedItem}
                          rightText={item.name}
                          checkedCheckBoxColor='red'
                          uncheckedCheckBoxColor='black'
                        />
                      </>
                    )}
                  </View>
                );
              })
            )}
          </View>
        )}

        {editOrder && (
          <View>
            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(
                  `${
                    titleBold && 'font-bold'
                  } ml-3 text-left text-lg leading-7 `
                ),
              ]}
            >
              {title}
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
                title={order_detail.article.profile}
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
                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-base uppercase font-bold`),
                      ]}
                    >
                      {order_detail?.article.brand.name}
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
                      {order_detail?.article.articleNo}
                    </Text>

                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-sm pb-1`),
                      ]}
                    >
                      CAT: {order_detail?.article.category.name}
                    </Text>

                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-sm text-black`),
                      ]}
                    >
                      Retail Price: {order_detail?.article.retailPrice}
                    </Text>
                  </View>
                </View>
              </Pressable>

              <View style={tw.style(`absolute right-3 top-2`)}></View>
              <View style={tw.style(`pb-2 flex-row justify-between items-end`)}>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-light-blue uppercase text-xs`),
                  ]}
                >
                  Total qty:{totalquantity}
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
                  {editOrderdata?.map((item, ind) => {
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
                                  item.quantity === 0 ? bgQuantity : 'bg-white'
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
        )}
      </View>
    </ModelWrapper>
  );
};

export default CustomModel;

CustomModel.propTypes = {
  title: PropTypes.string,
  titleBold: PropTypes.bool,
};

CustomModel.defaultProps = {
  title: 'testing',
  titleBold: true,
};
const styles = StyleSheet.create({
  tdList: {
    fontSize: 16,
    fontFamily: 'SF_regular',
  },
  categoryList: {
    fontSize: 16,
    flex: 1,
    textTransform: 'capitalize',
    fontFamily: 'SF_regular',
  },
});
