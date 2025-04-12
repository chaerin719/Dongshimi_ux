import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';

const screenHeight = Dimensions.get('window').height; //비율계산하기



function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    Font.loadAsync({
      
      'diary': require('../src/assets/fonts/온글잎 공부잘하자나.ttf'),
      'com': require('../src/assets/fonts/온글잎 박다현체.ttf'),
      // 원하는 폰트 이름과 경로 지정
    }).then(() => setFontsLoaded(true));

  }, [])

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../src/assets/images/home.jpg')}
        style={styles.background}
        resizeMode="cover">

        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/diary')}>
            <Text style={{ color: "white", fontFamily: 'diary', fontSize: 30}}>일기장 쓰기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => router.push('/diaryList')}>\
            <Text style={{ color: "white", fontFamily: 'diary', fontSize: 30 }}>   목록</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: screenHeight * 0.54,
    paddingRight: screenHeight * 0.1,
  },

  buttonContainer: {
    width: 100,
    margin: 3
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default HomeScreen;