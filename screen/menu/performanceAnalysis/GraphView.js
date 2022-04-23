import React from 'react';
import { View, Text } from 'react-native';
import tw from '../../../common/themeTailwind';
const GraphView = () => {
  return (
    <View style={tw.style(`flex flex-row justify-evenly`)}>
      <View style={tw.style(`flex flex-row  items-center `)}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#79D2DE',
            height: 13,
            width: 13,
          }}
        ></View>
        <Text
          style={[{ fontFamily: 'SF_regular' }, tw.style(`text-gray ml-2`)]}
        >
          L.Y.
        </Text>
      </View>
      <View style={tw.style(`flex flex-row items-center`)}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#147ad6',
            height: 13,
            width: 13,
          }}
        ></View>
        <Text
          style={[{ fontFamily: 'SF_regular' }, tw.style(`text-gray ml-2`)]}
        >
          EST.
        </Text>
      </View>
      <View style={tw.style(`flex flex-row items-center`)}>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: '#ec6666',
            height: 13,
            width: 13,
          }}
        ></View>
        <Text
          style={[{ fontFamily: 'SF_regular' }, tw.style(`text-gray ml-2`)]}
        >
          ACT.
        </Text>
      </View>
    </View>
  );
};
export default GraphView;
