import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { withState, compose } from 'recompose';
import strings from '../strings';
import { base, colors } from '../theme';

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
});

const propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.string.isRequired,
};

const ProfileScreen = ({ navigation, error }) => (
  <View style={base.page}>
    <View style={styles.container}>
      <Text style={base.boldText}>
        {strings.feed.emptyData}
      </Text>
    </View>
  </View>
);

ProfileScreen.propTypes = propTypes;

export default compose(
  withState('error', 'setError', ''),
)(ProfileScreen);
