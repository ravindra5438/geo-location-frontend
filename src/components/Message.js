import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Message = ({ title, message, isFromMe }) => {
  const triangleStyle = isFromMe ? styles.triangleRight : styles.triangleLeft;
  
  return (
    <View style={styles.container}>
      <View style={[styles.messageBox, isFromMe ? styles.messageBoxRight : styles.messageBoxLeft]}>
        <View style={[styles.triangle, triangleStyle]} />
        <View style={styles.messageContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  messageBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal:10,
    position: 'relative',
    maxWidth: '80%',
  },
  messageBoxLeft: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 15,
    alignSelf:"flex-start"
  },
  messageBoxRight: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 15,
    alignSelf:'flex-end'

  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    position: 'absolute',
  },
  triangleLeft: {
    borderLeftWidth: 10,
    borderRightWidth: 0,
    borderBottomWidth: 10,
    borderColor: 'transparent',
    borderRightColor: 'transparent',
    left: -10,
    top: 10,
  },
  triangleRight: {
    borderLeftWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderColor: 'transparent',
    borderLeftColor: 'transparent',
    right: -10,
    top: 10,
  },
  messageContent: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});

export default Message;
