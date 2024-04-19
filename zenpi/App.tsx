import { useFonts } from 'expo-font';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { backgroundColor, buttonColour, textColour } from './zenpi-configurations';
import { SettingsModal } from './components/SettingsModal';
import { ZenpiButton } from './components/ZenpiButton';


SplashScreen.preventAutoHideAsync();

const defaultPiEndpoint = 'http://192.168.0.224:4000/'

export default function App() {
  const [logs, setLogs] = useState('');
  const [zenpiEndpointUrl, setZenpiEndpointUrl] = useState(defaultPiEndpoint)
  const [showSettingsModal, setShowSettingsModal] = useState(true);
  const fetchConfig = {
    method: "POST",
  }

  const Start = async () => {
    console.log(zenpiEndpointUrl)
    setLogs(`starting STOP request to endpoint: ${zenpiEndpointUrl}`)
    await fetch(`${zenpiEndpointUrl}${'start/'}`, fetchConfig).then(response => {
      setLogs(response.status.toString())
      console.log(response.status.toString());
    }).catch(e => setLogs(e.message))
  }

  const Stop = async () => {
    setLogs(`starting STOP request to endpoint: ${zenpiEndpointUrl}`)
    await fetch(`${zenpiEndpointUrl}${'stop/'}`, fetchConfig).then(response => {
      setLogs(response.status.toString())
      console.log(response.status.toString());
    }).catch(e => setLogs(e.message))
  }

  const [fontsLoaded] = useFonts({
    'Borel-Regular': require('./assets/fonts/Borel-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      onLayout={onLayoutRootView}
    >
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsIcon}>
          <Ionicons name="settings-sharp" size={24} color={textColour} onPress={() => setShowSettingsModal(!showSettingsModal)} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.mainZone}>
        <Text style={styles.heading}>Zenpi</Text>
        {!showSettingsModal ? <SettingsModal urlSetter={setZenpiEndpointUrl} /> :
          <>
            <ZenpiButton zenpiButtonText={"Start"} stopFunction={Start} />
            <ZenpiButton zenpiButtonText={"Stop"} stopFunction={Stop} />
          </>
        }
        <Text>
          {logs}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  body: {
    backgroundColor
  },
  heading: {
    color: textColour,
    fontSize: 90,
    fontFamily: 'Borel-Regular',
    paddingBottom: 100,
  },
  mainZone: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 50,
  },
  input: {
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    color: 'white'
  },
  banner: {
    width: '100%',
    height: '10%',
    position: 'absolute',
    backgroundColor: buttonColour,
    justifyContent: 'center',
    alignItems: 'center'
  },
  settingsContainer: {
    display: 'flex',
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 30
  },
  settingsIcon: {
    backgroundColor: buttonColour,
    borderRadius: 8,
    padding: 3,
  },
  scrollViewStyle: {
  },
});
