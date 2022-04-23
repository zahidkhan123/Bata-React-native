import React from 'react';
import { StyleSheet, Text } from 'react-native';

const AuthFooter = () => {
  return (
    <Text style={styles.footerText}>
      For Support{' '}
      <Text style={styles.footerTextChild}>Call us @ 000012345678</Text>
    </Text>
  );
};

export default AuthFooter;

const styles = StyleSheet.create({
  footerText: {
    textAlign: 'center',
    marginTop: 15,
    fontFamily: 'SF_regular',
  },

  footerTextChild: {
    fontWeight: '700',
    fontFamily: 'SF_regular',
  },
});
