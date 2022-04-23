import React from 'react';
import { View, ScrollView, ImageBackground, StyleSheet } from 'react-native';

// components
import Header from './Header';
import Footer from './Footer';

// style
import tw from '../common/themeTailwind';
import { childrenStyle } from '../common/style';

// images
import MaskImage from '../assets/mask.png';
import IconFilter from '../assets/images/menu/Icon_filter.svg';

const Wrapper = ({
  children,
  editIcon,
  navigation,
  logo,
  title,
  backIcon,
  rightIcon,
  IconFilter,
  backArrow,
  header,
  footer,
  style,
  showInput,
  searchIcon,
  search,
  map,
}) => {
  return (
    <ImageBackground source={MaskImage} style={tw.style('flex-1 relative')}>
      {header && (
        <Header
          navigation={navigation && navigation}
          logo={logo && logo}
          title={title && title}
          backIcon={backIcon && backIcon}
          rightIcon={rightIcon && rightIcon}
          backArrow={backArrow && backArrow}
          editIcon={editIcon && editIcon}
          IconFilter={IconFilter && IconFilter}
          showInputField={showInput && showInput}
          searchIcon={searchIcon && searchIcon}
          search={search && search}
        />
      )}

      <View
        style={[tw.style(`${!map && 'px-6 py-1 mb-16'} mb-10 ${style ?? ''}`)]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={childrenStyle.children}
          alwaysBounceVertical={false}
          overScrollMode='never'
        >
          {children}
        </ScrollView>
      </View>

      {/* {footer && <Footer navigation={navigation && navigation} />} */}
    </ImageBackground>
  );
};

export default Wrapper;

// const styles = StyleSheet.create({
//   child: {
//     height: height - 128,
//   },
// });

Wrapper.defaultProps = {
  header: true,
  footer: true,
};
