import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import NcmBg from '../../assets/ncmBg.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
  },
});

const BackgroundImage = ({ children }) => (
  <Image style={styles.container} source={NcmBg} resizeMode={Image.resizeMode.cover}>
    {children}
  </Image>
);

export default BackgroundImage;
