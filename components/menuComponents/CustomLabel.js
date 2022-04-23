// Custom label is used in Menu tab, show blue background labels
import React from 'react';
import { View, Text } from 'react-native';

// syles tailwind css
import tw from '../../common/themeTailwind';

const CustomLabel = ({ title, style }) => {
  return (
    <View style={tw.style(`bg-light-blue rounded items-center`)}>
      <Text
        style={[
          { fontFamily: 'SF_regular' },
          tw.style(`text-white text-base ${style}`),
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default CustomLabel;
