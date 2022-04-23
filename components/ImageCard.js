import React from 'react';
import { View } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ImageCard = ({ children }) => {
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

export default ImageCard;
