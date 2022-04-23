import React from 'react';
import { ImageBackground, ScrollView } from 'react-native';

// components
import Header from './AuthHeaders';

// Style / Tailwind
import tw from '../../common/themeTailwind';

// images
import MaskImage from '../../assets/mask.png';

const Wrapper = ({
  children,
  vectorIcon,
  navigation,
  backIcon,
  heading,
  logo,
  title,
}) => {
  return (
    <ImageBackground source={MaskImage} style={tw.style('flex-1')}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        overScrollMode='never'
        contentContainerStyle={tw.style(`flex-grow justify-between`)}
      >
        <Header
          vectorIcon={vectorIcon && vectorIcon}
          navigation={navigation && navigation}
          backIcon={backIcon && backIcon}
          heading={heading && heading}
          logo={logo && logo}
          title={title && title}
        />
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default Wrapper;
