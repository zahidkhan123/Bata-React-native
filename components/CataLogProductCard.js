import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  CheckBox,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import ProductCategoryFilter from './ProductCategoryFilter';
import FilterIcon from '../assets/filter.svg';
import Tag from './Tag';
import Image from '../assets/images/Image 15.svg';
import EditIcon from '../assets/images/ic_edit.svg';
import CardWrapper from './CardWrapper';
import { orderDetail } from '../redux/actions/categoryAction';
import Note from '../assets/ordernote.svg';
import EmptyData from '../assets/empty-data.svg';

const CataLogProductCard = ({ navigation, showInput }) => {
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState(null);

  const dispatch = useDispatch();
  const catalog = useSelector((state) => state.catlog);
  const { catlog } = catalog;
  const [catalogFilter, setCatalogFilter] = useState(catlog);
  const searchFilter = (text) => {
    setMasterData(catalogFilter);
    let fitlerData = JSON.parse(JSON.stringify(catlog));
    // let masterData = [...newProducts];

    if (text) {
      const newData = fitlerData.filter((item) => {
        const itemData = item?.article?.category?.name
          ? item?.article?.category?.name.toUpperCase()
          : 'No Product Found '.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setCatalogFilter(newData);
      setSearch(text);
    } else {
      setCatalogFilter(masterData);
      setSearch('');
    }
  };

  return (
    <ScrollView style={tw.style(`mb-8`)}>
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
      {!showInput && (
        <View>
          {/* <ScrollView overScrollMode='never' horizontal={true}>
            <ProductCategoryFilter />
          </ScrollView> */}
          <View
            style={tw.style(
              `flex flex-row justify-between mt-3 bg-transparent w-full items-center p-2 rounded-md `
            )}
          >
            <Text style={{ fontFamily: 'SF_regular' }}></Text>
            <FilterIcon onPress={() => navigation.navigate('ProductFilter')} />
          </View>
        </View>
      )}
      {catlog.length === 0 && (
        <View style={tw.style(`justify-center items-center h-full my-24`)}>
          <EmptyData />
        </View>
      )}
      {catlog &&
        catlog.map((item, ind) => (
          <View key={item.article.articleNo}>
            <CardWrapper style='relative' padding>
              <Tag style='left-3' title={item.article.profile} />
              <Pressable
                onPress={() => {
                  let article = {
                    articleNo: item.article.articleNo,
                  };
                  dispatch(orderDetail(article));
                  navigation.navigate('ProductOrderCard', {
                    itemId: item.article.articleNo,
                  });
                }}
                style={tw.style(`py-4 flex-row justify-between`)}
              >
                <View style={tw.style(`flex-row flex-2 items-center`)}>
                  <View style={tw.style(`pr-4`)}>
                    <Image />
                  </View>

                  <View>
                    <Text
                      style={[
                        { fontFamily: 'SF_bold' },
                        tw.style(`text-base `),
                      ]}
                    >
                      {item.article.brand.name}
                      {console.log(item.article.brand.name)}
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
                      {item.article.articleNo}
                    </Text>

                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-sm pb-1 capitalize`),
                      ]}
                    >
                      CAT: {item.article.category.name}
                    </Text>

                    <Text
                      style={[
                        { fontFamily: 'SF_regular' },
                        tw.style(`text-sm text-black`),
                      ]}
                    >
                      Retail Price: {item.article.retailPrice}
                    </Text>
                  </View>
                </View>
              </Pressable>

              <View style={tw.style(`absolute right-4 top-2`)}>
                <View
                  style={tw.style(
                    `border rounded-xl border-red-700 flex justify-center items-center`
                  )}
                >
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-red-500 text-xs py-1 px-2`),
                    ]}
                  >
                    New
                  </Text>
                </View>
              </View>
              <View
                style={tw.style(`flex-row-reverse justify-between items-end`)}
              >
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
                    <Note />
                  </View>
                  <Text
                    style={[
                      { fontFamily: 'SF_regular' },
                      tw.style(`text-black uppercase text-xs`),
                    ]}
                  >
                    Order Now
                  </Text>
                </Pressable>
              </View>
            </CardWrapper>
          </View>
        ))}
    </ScrollView>
  );
};

export default CataLogProductCard;
