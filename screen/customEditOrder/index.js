import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

// components
import Wrapper from '../../components/Wrapper';
import Model from '../../components/model/CustomModel';
import CustomEditProduct from '../../components/CustomEditProduct';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../../redux/actions/dashboardAction';
import tw from 'tailwind-react-native-classnames';

const CustomEditOrder = ({ route, navigation }) => {
  const [modelActive, setModelActive] = useState(true);
  const { article, product } = route.params;

  return (
    <Wrapper title='Custom Order' backIcon navigation={navigation}>
      {/* {loading ? ( */}
      {/* <View style={tw.style(`my-auto`)}>
        <ActivityIndicator size='large' color='#ff0000' />
      </View> */}
      {/* ) : ( */}
      {modelActive && (
        <Model
          modalVisible={modelActive}
          setModalVisible={setModelActive}
          title={`Maximum 20 pairs of shoes are allowed for a single product.`}
          editOrderPopup
        />
      )}
      <CustomEditProduct
        navigation={navigation}
        article={article}
        product={product}
        EditProduct
      />
      {/* )} */}
    </Wrapper>
  );
};

export default CustomEditOrder;
