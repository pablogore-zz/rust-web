import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors, vw } from 'theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: vw(70),
    borderWidth: 1,
    borderRadius: 40,
  },
  element: {
    fontSize: 10,
  },
});

const Button = ({ isLoading = false, marginTop = 0, color = colors.black, value = '', onClicked }) => {
  if (isLoading) {
    return (
      <View style={[styles.container, { marginTop, borderColor: color }]}>
        <ActivityIndicator size="large" color={color} />
      </View>
    );
  }
  return (
    <TouchableOpacity style={[styles.container, { marginTop, borderColor: color }]} onPress={onClicked}>
      <Text style={[styles.element, { color }]}>{value}</Text>
    </TouchableOpacity>
  );
};

export default Button;
