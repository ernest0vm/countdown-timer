import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {configTimer, useTimer} from './src/utils/timer';
import clockify from './src/utils/clockify';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SingletonHooksContainer} from 'react-singleton-hook';

const Countdown = () => {
  const {start, pause, reset, stop, isFinished, secondsLeft} = useTimer();
  return (
    <View>
      <Text style={styles.time}>{clockify(secondsLeft).displayMS}</Text>
      <Text style={styles.time}>{`isFinished: ${isFinished}`}</Text>
      <View style={styles.controlRow}>
        <Button title="Start" onPress={start} />
        <Button title="Pause" onPress={pause} />
        <Button title="Reset" onPress={reset} />
        <Button title="Stop" onPress={stop} />
      </View>
    </View>
  );
};

const Screen1 = ({navigation}) => {
  configTimer(500, true);
  return (
    <View style={styles.container}>
      <Countdown />
      <Button
        title="Next Screen"
        onPress={() => navigation.navigate('Home2')}
      />
    </View>
  );
};

const Screen2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Countdown />
      <Button
        title="Next Screen"
        onPress={() => navigation.navigate('Home3')}
      />
    </View>
  );
};
const Screen3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Countdown />
      <Button title="First Screen" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <SingletonHooksContainer />
      <SafeAreaProvider style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home1"
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: 'black',
              },
            }}>
            <Stack.Screen name="Home1" component={Screen1} />
            <Stack.Screen name="Home2" component={Screen2} />
            <Stack.Screen name="Home3" component={Screen3} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'black',
  },
  time: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
});

export default App;
