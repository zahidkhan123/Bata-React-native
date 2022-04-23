import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

// components
import Wrapper from '../../components/Wrapper';
import Model from '../../components/model/CustomModel';
import EditProduct from '../../components/EditProduct';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { suggestedProducts } from '../../redux/actions/dashboardAction';
import tw from 'tailwind-react-native-classnames';

const EditOrder = ({ route, navigation }) => {
  const [modelActive, setModelActive] = useState(true);

  const { article, product } = route.params;

  return (
    <Wrapper title='Edit Order' backIcon navigation={navigation}>
      {/* {loading ? ( */}
      {/* <View style={tw.style(`my-auto`)}>
        <ActivityIndicator size='large' color='#ff0000' />
      </View> */}
      {/* ) : ( */}
      <EditProduct
        navigation={navigation}
        article={article}
        product={product}
        EditProduct
      />
      {/* )} */}
    </Wrapper>
  );
};

export default EditOrder;
