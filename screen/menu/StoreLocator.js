import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
  Callout,
} from 'react-native-maps';
// components
import Wrapper from '../../components/Wrapper';
import tw from 'tailwind-react-native-classnames';

// images
import backArrow from '../../assets/images/Nevigationbar.svg';
import MapMarker from '../../assets/marker.svg';
import CartMarker from '../../assets/cartMarker.svg';
import MapImage from '../../assets/map_bata.svg';
import { storeLocatorAction } from '../../redux/actions/storeLocatorAction';
import { useSelector, useDispatch } from 'react-redux';
const StoreLocator = ({ navigation }) => {
  const dispatch = useDispatch();
  const storeLocator = useSelector((state) => state.storeLocator);
  const data = storeLocator?.locators?.data;
  debugger;
  useEffect(() => {
    dispatch(storeLocatorAction());
  }, [dispatch]);

  return (
    <Wrapper
      navigation={navigation}
      title='Store Locator'
      backArrow={backArrow}
      map
    >
      <MapView
        style={styles.map}
        zoomEnabled={true}
        provider={PROVIDER_DEFAULT}
        // minZoomLevel={7}
        initialRegion={{
          latitude: 33.3753,
          longitude: 73.3451,
          latitudeDelta: 9.9922,
          longitudeDelta: 2.9221,
        }}
      >
        {data?.map((store, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(store.longitude),
                longitude: Number(store.latitude),
              }}
              pinColor={'#ff0000'}
              // image={require('../../assets/cartMarker.svg')}
            >
              <CartMarker height={50} width={50} />
              <Callout style={styles.callout}>
                <View style={styles.storeIcon}>
                  <MapMarker />
                </View>
                <View style={(styles.storeText, tw.style(`px-2 w-52`))}>
                  <Text style={styles.bold}>{store.store}</Text>
                  <Text style={styles.bold1}>{store.storeName}</Text>
                  <Text style={tw.style(`mt-1`)}>{store.address}</Text>
                </View>
                <View style={styles.storeImage}>
                  {store.store_image.url !== '' ? (
                    <Image
                      style={styles.storeImage}
                      source={{ uri: store.store_image.url }}
                    />
                  ) : (
                    <MapImage />
                  )}
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </Wrapper>
  );
};

export default StoreLocator;

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  callout: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
  },
  storeText: {
    flexWrap: 'wrap',
  },
  storeImage: {
    flex: 1,
  },
  bold: {
    fontWeight: '900',
  },
  bold1: {
    fontWeight: 'bold',
    marginTop: 2,
  },
});
