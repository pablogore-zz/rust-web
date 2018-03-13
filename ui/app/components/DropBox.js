import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image } from 'react-native';
import { compose, withState, branch, renderComponent } from 'recompose';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderRadius: 5,
    width: 300,
    height: 300,
  },
  containerNoBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 300,
  },
  text: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
};

const defaultProps = {
  width: 300,
  height: 300,
};

const DropBox = ({ imageUrl }) => (
  <View style={styles.containerNoBorder}>
    <img src={imageUrl} width={300} height={300} />
  </View>
);

const convertFileToImage = (e, setImageUrl, setFile) => {
  e.preventDefault();
  let reader = new FileReader();
  let file = e.target.files[0];
  // reader.onabort = () => console.log('file reading was aborted');
  // reader.onerror = () => console.log('file reading has failed');
  reader.onloadend = () => {
    setImageUrl(reader.result);
    setFile(file);
  };
  reader.readAsDataURL(file);
};

const DropBoxEmpty = ({ width, height, setImageUrl, setFile }) => (
  <View style={styles.container}>
    <View style={styles.text}>
      <Text>
        Select an image.
      </Text>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
        <input type='file' onChange={(e) => convertFileToImage(e, setImageUrl, setFile )} />
      </View>
    </View>
  </View>
);

DropBox.propTypes = propTypes;
DropBox.defaultProps = defaultProps;

export default compose(
  withState('imageUrl', 'setImageUrl', ''),
  branch(
    ({ imageUrl }) => !!imageUrl,
    renderComponent(DropBox),
    renderComponent(DropBoxEmpty),
  ),
)(View);
