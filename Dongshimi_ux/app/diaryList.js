import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, Image } from 'react-native';
import useDiaryStore from '../src/stores/useDiaryStore';
import * as Font from 'expo-font';

const screenHeight = Dimensions.get('window').height;

const weatherOptions = [
  { image: require('../src/assets/images/png모음/sun.png'), label: '맑음' },
  { image: require('../src/assets/images/png모음/cloud.png'), label: '구름' },
  { image: require('../src/assets/images/png모음/elec.png'), label: '번개' },
  { image: require('../src/assets/images/png모음/torn.png'), label: '바람' },
];

function DiaryListScreen() {
  const [weather, setWeather] = useState(null);
  const [text, setText] = useState('');
  const { entries } = useDiaryStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'diary': require('../src/assets/fonts/온글잎 공부잘하자나.ttf'),
      'com': require('../src/assets/fonts/온글잎 박다현체.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Text style={styles.title}>당신의 마음 날씨를 확인해 보세요!</Text>

        <View style={styles.weatherContainer}>
          {weatherOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.weatherButton,
                weather === option.label && styles.selectedButton,
              ]}
              onPress={() => setWeather(option.label)}
            >
              <Image source={option.image} style={styles.weatherImage} />
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.subtitle}>일기장 목록</Text>

        <ScrollView>
          {entries.map((entry, index) => (
            <View key={index} style={styles.entryBox}>
              <Text style={{fontSize: 17,fontWeight: '600',marginBottom: 4,fontFamily: 'com',marginBottom: 10,}}>{entry.date}</Text>
              <Text style={{fontSize: 18,marginBottom: 10,fontFamily: 'diary',}}>{entry.content.slice(0, 60)}...</Text>
              <Text style={{fontSize: 20, color: '#555',fontFamily: 'com',}}>📝 {entry.teacherComment}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default DiaryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.05,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'diary',
    fontSize: 25,
    letterSpacing: 1,
    lineHeight: 30,
    
    marginBottom: 15,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  weatherButton: {
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 60,
  },
  selectedButton: {
    backgroundColor: '#dceeff',
    borderColor: '#3399ff',
  },
  weatherImage: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'diary',
    marginBottom: 15,
    marginLeft:15,
    fontWeight: '600',
    color:"gray",
    letterSpacing: 2,
    lineHeight: 30,
  },
  entryBox: {
    marginBottom: 16,
    padding: 17,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
  },

});
