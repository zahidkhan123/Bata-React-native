import React from 'react';
import {
  Text,
  View,
  Pressable,
  TextInput,
  Linking,
  Platform,
} from 'react-native';

// style
import tw from '../common/themeTailwind';

// images
import Logo from '../assets/images/bata-logo-white.svg';
import BackIcon from '../assets/images/caret-left.svg';
import BackArrow from '../assets/images/Nevigationbar.svg';
import EditIcon from '../assets/images/ic_edit_white.svg';
import SearchIcon from '../assets/searchIcon.svg';
import IconFilter from '../assets/images/menu/Icon_filter.svg';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Header = ({
  navigation,
  logo,
  title,
  backIcon,
  editIcon,
  backArrow,
  rightIcon: RightIcon,
  IconFilter,
  showInputField,
  searchIcon: SearchIcon,
  search,
}) => {
  const dispatch = useDispatch();

  const bannerImages = useSelector((state) => state.banners);
  const { loading } = bannerImages;
  const phoneNo = bannerImages?.banners?.data?.phoneNumber;
  let count = 0;
  const makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNo}`;
    } else {
      phoneNumber = `telprompt:${phoneNo}`;
    }

    Linking.openURL(phoneNumber);
  };
  const searchCall = () => {
    if (count === 0) {
      showInputField(true);
      count--;
    } else {
      showInputField(false);
    }
  };
  return (
    <View
      style={tw.style(`h-14 bg-red px-6 flex-row items-center justify-between`)}
    >
      <View style={tw.style(`flex-row`)}>
        {backIcon && (
          <Pressable
            onPress={() => navigation.goBack()}
            style={tw.style(`pr-4`)}
          >
            <BackIcon />
          </Pressable>
        )}
        <View>
          {backArrow && (
            <Pressable
              onPress={() => navigation.goBack()}
              style={tw.style(`mr-4`)}
            >
              <BackArrow />
            </Pressable>
          )}
        </View>
        {logo && <Logo width={50} height={10} fill='#fff' />}
        {title && (
          <Text
            style={[
              { fontFamily: 'SF_regular' },
              tw.style(`text-xl text-white`),
            ]}
          >
            {title}
          </Text>
        )}
      </View>
      <View>{editIcon && <EditIcon style={tw.style(`left-36`)} />}</View>

      <View>{IconFilter && <IconFilter style={tw.style(`left-6`)} />}</View>
      <TouchableOpacity onPress={makeCall}>
        {RightIcon && <RightIcon />}
      </TouchableOpacity>
      {search && (
        <TouchableOpacity onPress={searchCall}>
          {search && <SearchIcon />}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
