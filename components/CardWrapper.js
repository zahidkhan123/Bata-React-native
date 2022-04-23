import React from 'react';
import { Text, View } from 'react-native';

// style / tailwind
import tw from '../common/themeTailwind';

const CardWrapper = ({ children, style, padding }) => {
  return (
    <View
      style={tw.style(
        `rounded-xl bg-white ${padding ? 'py-6 px-4 my-2' : ''} ${style ?? ''}`
      )}
    >
      {children}
    </View>
  );
};

export default CardWrapper;
