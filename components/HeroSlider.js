import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

// style / tailwind
import tw from '../common/themeTailwind';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { banners } from '../redux/actions/dashboardAction';

// Get device dimensions
const { width } = Dimensions.get('window');

const Slider = () => {
  const dispatch = useDispatch();

  const bannerImages = useSelector((state) => state.banners);
  const { loading } = bannerImages;
  const images = bannerImages?.banners?.data?.banner_images;

  useEffect(() => {
    dispatch(banners());
  }, [dispatch]);
  return (
    <View style={tw.style(`h-1/2`)}>
      {loading && (
        <View style={tw.style(`my-auto`)}>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      )}
      <SwiperFlatList
        autoplay
        autoplayDelay={10}
        autoplayLoop
        // loop = {false}
        showPagination
        paginationDefaultColor='white'
        autoplayLoopKeepAnimation
        paginationStyleItemActive={tw.style(
          `bg-transparent border border-white`
        )}
        data={images}
        renderItem={({ item: Item, key }) => (
          <View key={key} style={[styles.child, tw.style(``)]}>
            {/* <Item.image /> */}
            <Image
              style={tw.style(`h-full w-full rounded-lg`)}
              source={{
                uri: Item.url,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;

// import React, { useEffect } from 'react';
// import {
//   Dimensions,
//   StyleSheet,
//   View,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import { SwiperFlatList } from 'react-native-swiper-flatlist';

// // style / tailwind
// import tw from '../common/themeTailwind';
// // Redux
// import { useDispatch, useSelector } from 'react-redux';
// import { banners } from '../redux/actions/dashboardAction';

// // Get device dimensions
// const { width } = Dimensions.get('window');

// const Slider = () => {
//   const dispatch = useDispatch();

//   const bannerImages = useSelector((state) => state.banners);
//   const { loading } = bannerImages;
//   const images = bannerImages?.banners?.data?.banner_images;

//   useEffect(() => {
//     dispatch(banners());
//   }, [dispatch]);
//   return (
//     <View style={tw.style(`h-1/2`)}>
//       {loading && (
//         <View style={tw.style(`my-auto`)}>
//           <ActivityIndicator size='large' color='#ff0000' />
//         </View>
//       )}
//       <SwiperFlatList
//         autoplay
//         autoplayDelay={5}
//         autoplayLoop
//         showPagination
//         paginationDefaultColor='white'
//         autoplayLoopKeepAnimation
//         paginationStyleItemActive={tw.style(
//           `bg-transparent border border-white`
//         )}
//         data={images}
//         renderItem={({ item: Item, key }) => (
//           <View key={key} style={[styles.child, tw.style(``)]}>
//             {/* <Item.image /> */}
//             <Image
//               style={tw.style(`h-full w-full rounded-lg`)}
//               source={{
//                 uri: Item.url,
//               }}
//             />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default Slider;

const styles = StyleSheet.create({
  child: {
    width: width - 48,
    // height: 450,
  },
});
