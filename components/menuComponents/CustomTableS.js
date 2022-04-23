import React from 'react';
import { View, Text } from 'react-native';

// styles tailwind css
import tw from '../../common/themeTailwind';

const CustomTableS = ({
  headOne,
  headTwo,
  headThird,
  dataOne,
  dataTwo,
  dataThird,
}) => {
  return (
    <View style={tw.style(`py-3`)}>
      <View style={tw.style(`flex-row border rounded-t-lg justify-between`)}>
        <View style={tw.style(`flex-3 border-r items-center py-2`)}>
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-red-500  text-center`),
            ]}
          >
            {headOne}
          </Text>
        </View>
        <View style={tw.style(`flex-2 border-r items-center py-2`)}>
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-red-500   text-center`),
            ]}
          >
            {headTwo}
          </Text>
        </View>
        <View style={tw.style(`flex-3 items-center py-2`)}>
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-red-500   text-center`),
            ]}
          >
            {headThird}
          </Text>
        </View>
      </View>

      <View
        style={tw.style(
          `mt-0 pt-0 flex-row border border-t-0 rounded-b-lg justify-between items-end`
        )}
      >
        <View style={tw.style(`flex-3 border-r items-center py-2`)}>
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
            {dataOne}
          </Text>
        </View>
        <View style={tw.style(`flex-2 border-r items-center py-2`)}>
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
            {dataTwo}
          </Text>
        </View>
        <View style={tw.style(`flex-3 items-center py-2`)}>
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
            {dataThird}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomTableS;
