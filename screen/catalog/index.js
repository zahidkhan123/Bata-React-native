import React, { useState } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';

// components
import Wrapper from '../../components/Wrapper';
import ProductCard from '../../components/ProductCard';
import tw from 'tailwind-react-native-classnames';
import { useSelector } from 'react-redux';
import CataLogProductCard from '../../components/CataLogProductCard';
import ProductCategoryFilter from '../../components/ProductCategoryFilter';
import SearchIcon from '../../assets/searchIcon.svg';
const Catalog = ({ navigation }) => {
  const catlogOrd = useSelector((state) => state.catlog);
  const categories = useSelector((state) => state?.category);
  const { loading: FilterLoading } = categories;
  const { loading } = catlogOrd;
  const [showInput, setShowInput] = useState(false);
  const showInputHandler = (value) => {
    setShowInput(value);
  };
  return (
    <Wrapper
      title='Catalog'
      searchIcon={SearchIcon}
      backIcon
      navigation={navigation}
      showInput={showInputHandler}
      search
    >
      {!FilterLoading && (
        <View>
          <ScrollView
            overScrollMode='never'
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ProductCategoryFilter />
          </ScrollView>
        </View>
      )}
      {loading ? (
        <View style={tw.style(`my-auto`)}>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      ) : (
        <CataLogProductCard navigation={navigation} showInput={showInput} />
      )}
    </Wrapper>
  );
};

export default Catalog;
