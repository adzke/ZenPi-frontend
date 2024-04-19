import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, TextInput, View } from 'react-native';
import { backgroundColor, buttonColour, buttonDefaultTextSize, defaultFontFamily, settingTitleDefaultSize, textColour } from '../zenpi-configurations';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface zenpiSettingsData {
  zenpiServerAddress: string
  zenpiServerPort: string
};

interface ModalProps {
  urlSetter: Function
};

enum ZenpiDataTypes {
  ZENPI_SERVER_ADDRESS,
  ZENPI_SERVER_PORT
}
export const SettingsModal: React.FC<ModalProps> = ({ urlSetter }) => {

  const [zenpiServerAddress, setZenpiServerAddress] = useState('');
  const [zenpiServerPort, setZenpiServerPort] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0
  const zenpiSettingsKey = 'zenpisettings'

  const onZenpiServerInputChange = (data: string, zenpiDataType: ZenpiDataTypes) => {
    switch (zenpiDataType) {
      case ZenpiDataTypes.ZENPI_SERVER_ADDRESS:
        setZenpiServerAddress(data);
        break;
      case ZenpiDataTypes.ZENPI_SERVER_PORT:
        setZenpiServerPort(data);
        break;
    };
  };

  const saveZenpiData = async () => {
    const zenpiServerData: zenpiSettingsData = {
      zenpiServerAddress,
      zenpiServerPort
    };
    await storeData(zenpiServerData);
  }

  const storeData = async (value: zenpiSettingsData) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(zenpiSettingsKey, jsonValue);
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(zenpiSettingsKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData().then((data: zenpiSettingsData) => {
      setZenpiServerAddress(data.zenpiServerAddress);
      setZenpiServerPort(data.zenpiServerPort);
      urlSetter(`http://${data.zenpiServerAddress}:${data.zenpiServerPort}/`);
    });
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{
      ...styles.modalSettingsContainer,
      opacity: fadeAnim, // Bind opacity to animated value
    }} >
      <Text style={styles.zenpiServerTitle}>
        Server Address
      </Text>
      <TextInput
        style={styles.zenpiServerTextInput}
        onChangeText={(text) => onZenpiServerInputChange(text, ZenpiDataTypes.ZENPI_SERVER_ADDRESS)}
        value={zenpiServerAddress}
        placeholder='192.168.xxx.xxx'
        onBlur={saveZenpiData}
      />
      <Text style={styles.zenpiServerTitle}>
        Server Port
      </Text>
      <TextInput
        style={styles.zenpiServerTextInput}
        onChangeText={(text) => onZenpiServerInputChange(text, ZenpiDataTypes.ZENPI_SERVER_PORT)}
        value={zenpiServerPort}
        placeholder='4000'
        onBlur={saveZenpiData}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  modalSettingsContainer: {
    display: 'flex',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zenpiServerTitle: {
    color: textColour,
    fontSize: settingTitleDefaultSize,
    fontFamily: defaultFontFamily,
  },
  zenpiServerTextInput: {
    width: 300,
    height: 70,
    margin: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    borderRadius: 8,
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: buttonColour,
    color: textColour,
    fontFamily: defaultFontFamily,
    textAlign: 'center',
  }
});