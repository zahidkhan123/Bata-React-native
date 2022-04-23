import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';

import Carousel from 'react-native-snap-carousel';
import tw from 'tailwind-react-native-classnames';
// import Wrapper from './CardWrapper';
import url1 from '../assets/images/shoesImages/shoes1.jpg';
import url2 from '../assets/images/shoesImages/shoes2.jpg';
import url3 from '../assets/images/shoesImages/shoes3.jpg';
import url4 from '../assets/images/shoesImages/shoes4.jpg';

import CardWrapper from './CardWrapper';
import ImageCard from './ImageCard';
import Wrapper from './Wrapper';
const { width: screenWidth } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const ProductOrderCard = ({ navigation }) => {
  const singleOrder = useSelector((state) => state.orderDetail);
  const { loading, singleProduct } = singleOrder;
  const { data } = !loading && singleOrder?.singleProduct;
  //   let images = [];

  //   data?.article.product_images.map((image) => {
  //     images.push(image.url);
  //   });
  // const images = [
  //   {
  //     id: 1,
  //     image: url1,
  //   },
  //   {
  //     id: 2,
  //     image: url2,
  //   },
  //   {
  //     id: 3,
  //     image: url3,
  //   },
  //   {
  //     id: 4,
  //     image: url4,
  //   },
  // ];

  const [img, setImg] = useState(url1);
  const carouselRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <Wrapper title='Product Details' backIcon navigation={navigation}>
      {loading ? (
        <View style={tw.style(` my-36`)}>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      ) : (
        <>
          <SafeAreaView style={tw.style(`flex`)}>
            <Carousel
              layout={'default'}
              ref={carouselRef}
              data={data?.article.product_images}
              renderItem={({ item, index }) => (
                <View
                  key={index}
                  style={[
                    { width: '90%' },
                    tw.style(`flex items-center rounded-lg bg-white  my-2 `),
                  ]}
                >
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 200,
                      width: 300,
                    }}
                    source={!!item.url ? item.url : url1}
                  />
                </View>
              )}
              sliderWidth={400}
              itemWidth={400}
              onSnapToItem={(index) => setSlideIndex(index)}
            />

            <View style={tw.style(`flex flex-row justify-between py-2 `)}>
              {data?.article.product_images.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => carouselRef.current.snapToItem(index)}
                >
                  <View
                    key={index}
                    style={tw.style(`flex px-2 rounded-lg bg-white `)}
                  >
                    <Image
                      style={{
                        resizeMode: 'contain',
                        height: 65,
                        width: 65,
                      }}
                      source={!!item.url ? item.url : url1}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </SafeAreaView>
          {/* <View
            style={tw.style(
              `flex w-full bg-white items-center rounded-xl my-3 `
            )}
          >
            <Image
              iterationCount={1}
              animation='bounceInLeft'
              direction='alternate'
              style={tw.style(` object-contain h-48 w-full   `)}
              source={img}
            />
          </View> */}

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
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(`text-sm pb-1 uppercase mt-2`),
            ]}
          >
            {data?.article.brand.name} -&nbsp;
            {data?.article.category.categoryGroup.name}
          </Text>
          <View style={tw.style(`flex-row flex-2 items-center`)}>
            <View>
              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-light-blue text-sm py-1`),
                ]}
              >
                <Text
                  style={[{ fontFamily: 'SF_regular' }, tw.style(`text-sm`)]}
                >
                  Article #:
                </Text>
                <Text
                  style={[
                    { fontFamily: 'SF_regular' },
                    tw.style(`text-blue-300 text-sm`),
                  ]}
                >
                  {data?.article.articleNo}
                </Text>
              </Text>

              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-sm pb-1 capitalize`),
                ]}
              >
                CAT: {data?.article.category.name}
              </Text>

              <Text
                style={[
                  { fontFamily: 'SF_regular' },
                  tw.style(`text-sm text-black`),
                ]}
              >
                Price: {data?.article.retailPrice}
              </Text>
            </View>
          </View>
          <Text
            style={[
              { fontFamily: 'SF_bold' },
              tw.style(`text-lg mt-5 uppercase`),
            ]}
          >
            Available color
          </Text>
          <View
            style={{
              borderBottomColor: '#D3D3D3',
              borderBottomWidth: 1,
            }}
          />
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(` mt-2 w-8 h-8 bg-black rounded-full`),
            ]}
          ></Text>
        </>
      )}
    </Wrapper>
  );
};

export default ProductOrderCard;
