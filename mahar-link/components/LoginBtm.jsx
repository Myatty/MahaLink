import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

const LoginBtm = ({
  title,
  handlePress,
  containerStyles,  
  textStyles,       
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button, 
        containerStyles,               // This will allow you to override the default button styles
        isLoading ? styles.disabled : null  // Apply disabled styles when loading
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width:300,
    backgroundColor: '#347928',     // Default background color
    borderRadius: 12,               // Rounded corners
    minHeight: 62,                  // Minimum height
    justifyContent: 'center',       // Center text vertically
    alignItems: 'center',           // Center text horizontally
  },
  buttonText: {
    color: '#FEFEFE',               // Default text color (white)
    fontSize: 18,                   // Default text size
    fontWeight: '600',              // Semi-bold text
  },
  disabled: {
    opacity: 0.5,                   // Reduced opacity when loading
  },
});

export default LoginBtm;
