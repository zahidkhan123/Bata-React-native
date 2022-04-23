import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TextInput,
  CheckBox,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
import { catlog } from '../redux/actions/categoryAction';
import BackIcon from '../assets/images/caret-left.svg';
import SearchIcon from '../assets/searchIcon.svg';

const CataLogProductCard = ({ navigation }) => {
  const dispatch = useDispatch();
  const catalog = useSelector((state) => state?.catlog);

  const { loading } = catalog;
  const cataalog = catalog?.catlog;
  const pageNumber = catalog?.paginData?.page;
  const perPage = catalog?.paginData?.per_page;
  const isNextPageAvailable = catalog?.paginData?.next_page_exist;
  const isPreviousPageAvailable = catalog?.paginData?.previous_page_exist;

  const [newProducts, setNewProducts] = useState(null);
  const [masterData, setMasterData] = useState(null);
  const [numProducts, setNumProducts] = useState(null);
  const [search, setSearch] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    let updatedProducts = [];
    if (cataalog) {
      cataalog?.map((product) => {
        updatedProducts.push({ ...product });
      });
    }
    setNewProducts(updatedProducts);
    setNumProducts(updatedProducts);
    setMasterData(updatedProducts);
  }, [cataalog]);

  const isNumeric = (val) => {
    return /^-?\d+$/.test(val);
  };
  const searchFilter = (text) => {
    let fitlerData = JSON.parse(JSON.stringify(newProducts));
    let fitlerNum = JSON.parse(JSON.stringify(numProducts));

    if (isNumeric(text) == false && text !== '') {
      const newData = fitlerData.filter((item) => {
        const itemData = item?.article?.category?.name
          ? item?.article?.category?.name.toUpperCase()
          : 'No Product Found '.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setNewProducts(newData);

      setSearch(text);
    } else if (isNumeric(text) == true && text !== '') {
      const newData1 = fitlerNum.filter((item) => {
        const itemData1 = item?.article?.articleNo
          ? item?.article?.articleNo
          : 'No Product Found ';
        const textData = text;
        return itemData1.indexOf(textData) > -1;
      });
      setNewProducts(newData1);

      setSearch(text);
    } else if (text === '') {
      setNewProducts(masterData);

      setSearch('');
    }
  };

  // useEffect(() => {
  //   setPageIndex(pageNumber);
  //   setPageSize(perPage);
  //   setIsNextPage(isNextPageAvailable);
  // }, []);
  const fetchData = () => {
    console.log('called');
    if (isNextPageAvailable) {
      dispatch(
        catlog({
          pageIndex: pageNumber + 1,
          pageSize: perPage,
          category_ids: null,
          brand_ids: null,
        })
      );
    }
  };

  const renderProducts = ({ item }) => {
    return (
      <View key={item.articleNo}>
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
                  style={[{ fontFamily: 'SF_bold' }, tw.style(`text-base `)]}
                >
                  {item.article.brand.name}
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
          <View style={tw.style(`flex-row-reverse justify-between items-end`)}>
            <Pressable
              onPress={() => {
                navigation.navigate('CustomEditOrder', {
                  product: item,
                  price: item.article.retailPrice,
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
    );
  };

  const onLoading = () => {
    {
      return loading ? (
        <View style={tw.style(`my-auto h-full`)}>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      ) : null;
    }
  };

  return (
    <View>
      <View
        style={tw.style(
          `h-14 flex flex-row justify-between items-center bg-red-600 px-2 `
        )}
      >
        <View style={tw.style(`flex-row items-center`)}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={tw.style(`pr-4`)}
          >
            <BackIcon />
          </Pressable>
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(`text-xl text-white `),
            ]}
          >
            Catalog
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={tw.style(`flex items-center`)}
            onPress={() => setShowInput(!showInput)}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>
      </View>
      {showInput && (
        <View style={tw.style(`px-2`)}>
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
        </View>
      )}

      {!showInput && (
        <View style={tw.style(`px-2`)}>
          <ScrollView
            overScrollMode='never'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ProductCategoryFilter />
          </ScrollView>

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
      {newProducts?.newProducts?.length === 0 && (
        <View
          style={tw.style(`flex justify-center items-center my-auto h-full`)}
        >
          <EmptyData />
        </View>
      )}
      <FlatList
        style={tw.style(`mb-32 px-2`)}
        data={newProducts && newProducts}
        renderItem={renderProducts}
        keyExtractor={(item) => item.article.articleNo}
        onEndReached={fetchData}
        onEndReachedThreshold={0.8}
        ListFooterComponent={onLoading}
      />
    </View>
  );
};

export default CataLogProductCard;
