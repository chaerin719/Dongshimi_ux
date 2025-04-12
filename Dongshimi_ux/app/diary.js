import React, { useEffect, useState } from 'react';
import { Button, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import useDiaryStore from '../src/stores/useDiaryStore';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';

//const screenHeight = Dimensions.get('window').height;

const IMAGEWIDTH = 40;
const IMAGEHIEGHT = 40;
const FONTSIZE = 17;

const ImageBox = ({ image, bgImage }) => {
    const IMAGEWIDTH = 40;
    const IMAGEHIEGHT = 40;
    const { setBgImage } = useDiaryStore();
    return (
        <TouchableOpacity style={{ width: IMAGEWIDTH, height: IMAGEHIEGHT }} onPress={() => {
            setBgImage(bgImage)
        }}>
            {/*borderRadius: 10, borderWidth: 1,*/}
            <View style={{ borderColor: "gray", 
                width: IMAGEWIDTH, 
                height: IMAGEHIEGHT, 
                alignItems: "center", 
                justifyContent: "center" }}>
                <Image
                    source={image}
                    style={{ width: IMAGEWIDTH, height: IMAGEHIEGHT }} />
            </View>
        </TouchableOpacity>
    )
}
const sunImage = require("../src/assets/images/png모음/sun.png");
const cloudImage = require("../src/assets/images/png모음/cloud.png");
const elecImage = require("../src/assets/images/png모음/elec.png");
const tornImage = require("../src/assets/images/png모음/torn.png");
const hBgImage = require("../src/assets/images/bgImages/검토.jpg")
const sBgImage = require("../src/assets/images/bgImages/쩅쨍.jpg")
const sadBgImage = require("../src/assets/images/bgImages/우울구름.jpg")
const madBgImage = require("../src/assets/images/bgImages/핑번.jpg")

const DiaryScreen = () => {
    const router = useRouter();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [stampImage, setStampImage] = useState(require("../src/assets/images/png모음/회색도장 복사.png"));
    const [teacherTexts, setTeacherTexts] = useState('');
    const { addEntry, bgImage } = useDiaryStore();
    const [date, setDate] = useState('2025년 04월 07일')
    const [text, setText] = useState('');
    const weight = 350;
    const WIDTH = 1 * weight;
    const HEIGHT = 1.5 * weight;

    useEffect(() => {
        Font.loadAsync({
            'diary': require('../src/assets/fonts/온글잎 공부잘하자나.ttf'),
            'com': require('../src/assets/fonts/온글잎 박다현체.ttf'),
            // 원하는 폰트 이름과 경로 지정
        }).then(() => setFontsLoaded(true));

    }, [])

    const handleSubmit = () => {
        const today = date
        const newEntry = {
            date: today,
            content: text,
            teacherComment: '여기까지 차근차근 잘 준비한 걸 보면 분명히 잘 해낼 수 있을 거예요:) 당당하게 발표하고, 실수해도 괜찮다는 마음으로 도전해봐요. 너무 잘하고 있어요! ', // 나중에 AI로 변경
            //ai 변경
        };
        addEntry(newEntry); //전역 저장


        setText('');
        Alert.alert(
            '일기장 검사중... 🤔',
            '선생님이 봐도 될까요~ ?',
            [
            {
                text: '아니요',
                style: 'cancel'
            },
            {
                text: '네!',
                onPress: () => {
                    setStampImage(require("../src/assets/images/png모음/도장 복사.png"))
                    setTeacherTexts('여기까지 차근차근 잘 준비한 걸 보면 분명히 잘 해낼 수 있을 거예요:) 당당하게 발표하고, 실수해도 괜찮다는 마음으로 도전해봐요. 너무 잘하고 있어요!'); //나중에 AI로 변경
                }
            }
            ]
        );
    };


    return (
        <ImageBackground
            source={bgImage}
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: "#2C538B"
            }}
        >
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                <View style={{ backgroundColor: "white", borderRadius: 15, width: WIDTH, height: HEIGHT, borderColor: "black", borderWidth: 3 }}>
                    <View style={{ flex: 3, flexDirection: "row", }}>
                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 3, borderColor: "black", borderBottomWidth: 1, justifyContent: "center", paddingHorizontal: 15 }}>
                                {/* <Text style={{ fontFamily: '', fontSize: 13 }}>날짜</Text>*/}
                                <Text style={{ fontFamily: 'com', fontSize: 20,color:"gray" }}>{date}</Text>
                            </View>
                            <View style={{ flex: 4, borderColor: "black", borderWidth: 0, justifyContent: "center",alignItems: "center",paddingTop:22}}>
                                <ImageBox image={require("../src/assets/images/music.png")}></ImageBox>
                                <Text style={{ fontFamily: '', fontSize: FONTSIZE }}></Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, borderColor: "black", borderLeftWidth: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 0, paddingTop: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around" }}>
                                <ImageBox image={sunImage} bgImage={sBgImage}></ImageBox>
                                <ImageBox image={cloudImage} bgImage={sadBgImage}></ImageBox>
                                {/*</View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-around" }}>
                        */}
                                <ImageBox image={elecImage} bgImage={madBgImage}></ImageBox>
                                <ImageBox image={tornImage} bgImage={hBgImage}></ImageBox>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 11, borderColor: "black", borderTopWidth: 1, borderBottomWidth: 1 }}>
                        <View style={{ marginTop: 10 }} />
                        <TextInput
                            style={{
                                fontFamily: 'diary', fontSize: 22,
                                flex: 1,
                                textAlignVertical: 'top',
                                paddingHorizontal: 15,
                                letterSpacing: 1,
                                lineHeight: 30,

                            }}
                            value={text}
                            onChangeText={setText}
                            placeholder="오늘 있었던 일을 써볼까?..."
                            multiline
                        />

                        <TouchableOpacity
                            onPress={() => {
                                handleSubmit()


                            }}
                            style={{ justifyContent: 'flex-end', alignItems: 'flex-end', padding: 12, }}>
                            <Image
                                source={stampImage}
                                style={{ width: 80, height: 80, resizeMode: 'contain' }} />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 3, borderColor: "black", borderWidth: 0, padding: 5 }}>
                        <Text style={{ fontFamily: 'com', fontSize: 18, padding: 3, color: "gray" }}>선생님 한마디</Text>
                        <Text style={{ fontFamily: 'com', fontSize: 20,  paddingLeft: 8, color: "red" }}>{teacherTexts}</Text>
                        <View style={{ paddingTop: 20 }}>

                        </View>
                    </View>
                </View>
            </View >
        </ImageBackground >
    )
}

export default DiaryScreen;