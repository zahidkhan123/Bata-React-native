import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import CustomButton from './CustomButton';
import CustomReviewOrderTable from './CustomReviewOrderTable';
// import Wrapper from './CardWrapper';
import Tag from './Tag';
import Wrapper from './Wrapper';

const CustomEditCard = ({ product, article }) => {
  const articleno = article;
  const product_size = product.product_sizes;

  return (
    <>
      <>
        <Text
          style={[
            { fontFamily: 'SF_bold' },
            tw.style(`text-lg my-1  uppercase`),
          ]}
        >
          Product Information
        </Text>
        <View
          style={{
            borderBottomColor: '#D3D3D3',
            borderBottomWidth: 1,
          }}
        />
        <Tag style='right-3 top-9' title={product?.article.profile} />

        <Text
          style={[
            { fontFamily: 'SF_regular' },
            tw.style(`text-sm pb-1 uppercase mt-2 -mb-1`),
          ]}
        >
          {product?.article.brand.name} -{' '}
          {product?.article.category.categoryGroup.name}
        </Text>
        <View style={tw.style(`flex-row flex-2 items-center`)}>
          <View>
            <Text
              style={[{ fontFamily: 'SF_regular' }, tw.style(`text-sm py-1`)]}
            >
              Article #: {product?.article.articleNo}
            </Text>

            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(`text-sm pb-1 uppercase`),
              ]}
            >
              CAT: {product?.article.category.name}
            </Text>

            <Text
              style={[
                { fontFamily: 'SF_regular' },
                tw.style(`text-sm text-black`),
              ]}
            >
              Retail Price: {product?.article.retailPrice}
            </Text>
          </View>
        </View>
        <View style={tw.style(`py-3`)}>
          <View
            style={tw.style(
              `flex-row border border-gray-300 rounded-t-lg px-7 justify-between`
            )}
          >
            <View style={tw.style(`items-center py-2`)}>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-red-500  text-center`),
                ]}
              >
                Size
              </Text>
            </View>
            <View style={tw.style(`flex-2 items-center py-2 px-2`)}>
              <Text
                style={[
                  { fontFamily: 'SF_bold' },
                  tw.style(`text-red-500  text-center`),
                ]}
              >
                Quantity
              </Text>
            </View>
          </View>

          <CustomReviewOrderTable
            article={articleno}
            product_size={product_size}
            order_detail={product}
          />
        </View>
      </>
    </>
  );
};

export default CustomEditCard;
