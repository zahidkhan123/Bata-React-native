import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

// style / tailwind
import tw from '../../common/themeTailwind';

// component
import CardWrapper from '../CardWrapper';

// Get device dimensions
const { width } = Dimensions.get('window');

const Card = ({ Icon, title, style }) => {
  return (
    <CardWrapper style={style}>
      <View style={[styles.child, tw.style(`py-8 items-center`)]}>
        <View style={tw.style('pb-4')}>{Icon && <Icon />}</View>
        <Text
          style={[{ fontFamily: 'SF_regular' }, tw.style('text-xs text-black')]}
        >
          {title}
        </Text>
      </View>
    </CardWrapper>
  );
};

export default Card;

const styles = StyleSheet.create({
  child: {
    width: width / 2 - 30,
  },
});
