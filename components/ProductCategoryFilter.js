import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// style /tailwind
import tw from '../common/themeTailwind';
import { suggestedProducts } from '../redux/actions/dashboardAction';
import Model from './model/CustomModel';
import { useRoute } from '@react-navigation/native';
import { catlog } from '../redux/actions/categoryAction';

const ProductCategoryFilter = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const path = route.name;

  // const catalog = useSelector((state) => state.catlog);

  // const pageNumber = catalog?.paginData?.page;
  // const perPage = catalog?.paginData?.per_page;

  const catalog = useSelector((state) => state?.catlog);

  const { loading: catalogLoading } = catalog;
  const cataalog = catalog?.catlog;
  const pageNumber = catalog?.paginData?.page;
  const perPage = catalog?.paginData?.per_page;

  const [pageIndex, setPageIndex] = useState(pageNumber);
  const [pageSize, setPageSize] = useState(perPage);
  const [active, setActive] = useState('');
  const [catName, setCatName] = useState('');
  const [timer, setTimer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const categories = useSelector((state) => state?.category);

  const { loading } = categories;

  const suggestedProducts = useSelector((state) => state.suggestedProducts);
  const { loading: suggestedProductLoading } = suggestedProducts;

  let data;
  if (!loading) {
    data = categories?.categories?.data;
  }

  const userLogin = useSelector((state) => state.userLogin);
  const UserName = userLogin?.userInfo?.data?.UserName;

  const handleCatClick = (name) => {
    setCatName(name);
    setActive(name);
  };

  return (
    <ScrollView
      overScrollMode='never'
      horizontal={true}
      style={tw.style(`flex-row mt-2`)}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={() => {
          setActive(2);
          if (path === 'SuggestedOrder') {
            dispatch(
              suggestedProducts({
                outletID: UserName,
                pageIndex: pageIndex || 1,
                pageSize: pageSize || 20,
                category_ids: null,
                brand_ids: null,
              })
            );
          } else {
            dispatch(
              catlog({
                pageIndex: pageIndex || 1,
                pageSize: pageSize || 20,
                category_ids: null,
                brand_ids: null,
              })
            );
          }
        }}
        style={tw.style(
          `flex-1 px-4 py-2 items-center justify-center rounded-md mx-1 text-white ${
            active === 2 ? 'bg-dark-blue' : 'bg-gray-300'
          }`
        )}
      >
        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(active === 2 ? `text-white` : `text-black`),
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      {data?.map((item, ind) => (
        <TouchableOpacity
          key={ind}
          onPress={() => {
            setShowModal(true);
            handleCatClick(item.name);
          }}
          style={tw.style(
            `flex-1 px-4 py-2 items-center justify-center rounded-md mx-1 text-white 
            ${active === item.name ? 'bg-dark-blue' : 'bg-gray-300'}`
          )}
        >
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(active === item.name ? `text-white` : `text-black`),
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}

      {showModal && (
        <Model
          modalVisible={showModal}
          setModalVisible={setShowModal}
          title={`SELECT CATEGORY`}
          catData={data}
          categoryName={catName}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blueColor: {
    backgroundColor: '#0F4EA3',
  },
  grayColor: {
    backgroundColor: '#EEEEEE',
  },
});

export default ProductCategoryFilter;
