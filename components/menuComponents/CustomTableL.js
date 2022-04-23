import React from 'react';
import { View, Text } from 'react-native';

// styles tailwind css
import tw from '../../common/themeTailwind';

const CustomTableL = ({
  title,
  titleStyle,
  head_Style,
  headOne,
  headTwo,
  headThird,
  headFour,
  rowOne_1,
  rowOne_2,
  rowOne_3,
  rowOne_4,
  rowTwo_1,
  rowTwo_2,
  rowTwo_3,
  rowTwo_4,
}) => {
  return (
    <View style={tw.style(`py-3`)}>
      {/*First ROW of tabel */}
      <View style={tw.style(`flex-row border border-gray-200 rounded-t-lg`)}>
        <View style={tw.style(`flex-1 items-center py-2`)}>
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`${titleStyle}  text-center`),
            ]}
          >
            {title}
          </Text>
        </View>
      </View>

      {/* Second ROW of tabel */}
      <View style={tw.style(`flex-row border border-t-0 border-gray-200`)}>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-red-500  text-center`),
            ]}
          >
            {headOne}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`${head_Style ?? 'text-red-500'}  text-center`),
            ]}
          >
            {headTwo}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(` ${head_Style ?? 'text-red-500'} text-center`),
            ]}
          >
            {headThird}
          </Text>
        </View>

        {headFour && (
          <View style={tw.style(`flex-1 items-center py-2`)}>
            <Text
              style={[
                { fontFamily: 'SF_bold' },
                tw.style(` text-center text-red-500`),
              ]}
            >
              {headFour}
            </Text>
          </View>
        )}
      </View>

      {/* Third ROW of tabel */}
      <View style={tw.style(`flex-row border border-t-0 border-gray-200`)}>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
            {rowOne_1}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(`text-center`)]}>
            {rowOne_2}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text style={[{ fontFamily: 'SF_bold' }, tw.style(`text-center`)]}>
            {rowOne_3}
          </Text>
        </View>
        {rowOne_4 && (
          <View style={tw.style(`flex-1 items-center py-2`)}>
            <Text style={[{ fontFamily: 'SF_bold' }, tw.style(` text-center`)]}>
              {rowOne_4}
            </Text>
          </View>
        )}
      </View>

      {/* FOurth ROW of tabel */}

      <View
        style={tw.style(
          `flex-row border-gray-200 border border-t-0 rounded-b-lg`
        )}
      >
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(` text-light-blue text-center`),
            ]}
          >
            {rowTwo_1}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r items-center py-2 border-gray-200`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-light-blue text-center`),
            ]}
          >
            {rowTwo_2}
          </Text>
        </View>
        <View
          style={tw.style(`flex-1 border-r border-gray-200 items-center py-2`)}
        >
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-center text-light-blue`),
            ]}
          >
            {rowTwo_3}
          </Text>
        </View>
        {rowTwo_4 && (
          <View style={tw.style(`flex-1 items-center py-2`)}>
            <Text
              style={[
                { fontFamily: 'SF_bold' },
                tw.style(` text-center text-light-blue`),
              ]}
            >
              {rowTwo_4}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CustomTableL;
