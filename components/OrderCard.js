import React from 'react';
import { Text, View } from 'react-native';

// tailwind
import tw from '../common/themeTailwind';

// components
import ProductCard from './ProductCard';

// images
import EditIcon from '../assets/images/ic_edit.svg';

const OrderCard = () => {
  return (
    <View>
      <ProductCard />
    </View>
  );
};

export default OrderCard;
