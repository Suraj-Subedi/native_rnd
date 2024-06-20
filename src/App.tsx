/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView>
      <View style={styles.wrapperSection}>
        <Text style={styles.title}>{'Enter your details to login:'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapperSection: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
