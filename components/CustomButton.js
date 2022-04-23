import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

// style / tailwind
import tw from '../common/themeTailwind';

const CustomButton = ({ title, color, onPress, transparent }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `rounded-md bg-${color} h-12 justify-center items-center `
      )}
    >
      <Text
        style={[{ fontFamily: 'SF_regular' }, tw.style(`text-white text-lg`)]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

CustomButton.defaultProps = {
  color: 'red',
};
