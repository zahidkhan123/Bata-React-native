import React from 'react';
import { StyleSheet, Text } from 'react-native';

// style / tailwind
import tw from '../common/themeTailwind';

const Tag = ({ style, title }) => {
  return (
    <Text
      style={[
        { fontFamily: 'SF_regular' },
        tw.style(
          `absolute px-4 py-1 text-xs rounded-b-md text-white bg-yellow-dark ${
            style ?? ``
          }`
        ),
      ]}
    >
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  tagColor: {
    backgroundColor: '#F88402',
    // marginBottom: 40,
  },
});
export default Tag;
