import React from 'react';
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';
import { SvgUri } from 'react-native-svg';

// images
import BackIcon from '../../assets/images/backIcon.svg';

const AuthHeaders = (props) => {
  const {
    backIcon,
    logo: Logo,
    heading,
    navigation,
    title,
    vectorIcon: Vector,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        {backIcon && (
          <Pressable onPress={() => navigation.goBack()}>
            <BackIcon />
          </Pressable>
        )}
      </View>

      <View style={styles.vectorWrapper}>
        {Logo && (
          <View style={styles.logo}>
            <Logo />
          </View>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
        {heading && <Text style={styles.heading}>{heading}</Text>}
      </View>

      <View style={styles.heroImage}>{Vector && <Vector />}</View>
    </View>
  );
};

export default AuthHeaders;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 10,
  },

  backIcon: {
    marginTop: 25,
    marginBottom: 20,
  },

  vectorWrapper: {
    alignItems: 'center',
  },

  logo: {
    height: 35,
    marginBottom: 60,
  },

  heading: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'SF_regular',
  },

  title: {
    maxWidth: '85%',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 10,
    fontFamily: 'SF_regular',
  },

  heroImage: {
    alignItems: 'center',
    marginTop: 50,
    // marginBottom: 40,
  },
});
