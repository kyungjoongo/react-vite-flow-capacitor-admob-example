// @flow
import React, {useEffect, useState} from 'react'
import './App.css'
import {ActivityIndicator, ScrollView, View} from "react-native-web";
import {Button as AButton, Spin} from 'antd'
import {AdMob, InterstitialAdPluginEvents} from "@capacitor-community/admob";
import sharedService, {initializeAdmob, showBanner} from "./initAdmob";
import {Capacitor} from "@capacitor/core";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {Haptics, ImpactStyle} from "@capacitor/haptics";
import axios from "axios";
import _ from 'lodash'
import {CapacitorVideoPlayer} from "capacitor-video-player";
import {ActionSheet} from '@awesome-cordova-plugins/action-sheet'
import {YoutubeVideoPlayer} from '@awesome-cordova-plugins/youtube-video-player'
import {Toast} from '@capacitor/toast';
import {IonActionSheet, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {useHistory} from "react-router";
import BiometricScreen from "./BiometricScreen.jsx";
import {FingerPrintAuth} from "capacitor4-fingerprint-auth";

export default function MainScreen(props) {
    useEffect(() => {
        init()
        //
    }, [])

    const doGet = async () => {
        if (_.isEmpty(sharedService.results)) {
            setLoading(true)
            const response: any = await axios.get('https://jsonplaceholder.typicode.com/posts');
            sharedService.results = response.data;
            setTimeout(() => {
                setLoading(false)
            }, 300)
        }
    };


    const [loading, setLoading] = useState(false);


    async function init() {
        doGet();
        if (Capacitor.getPlatform() === 'android') {
            await initializeAdmob();
            //await showBanner();
        }

    }

    const [count, setCount] = useState(0)
    const showInitAdmob = async () => {
        AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
            // Subscribe prepared interstitial
        });
        const options = {
            adId: 'ca-app-pub-6826082357124500/4490007176',
            isTesting: true
            // npa: true
        };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
    }


    const startScan = async () => {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({force: true});

        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        await BarcodeScanner.hideBackground();

        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            console.log(result.content); // log the raw scanned content

            alert(result.content)
        }
    };

    const showConfirm = async () => {
        await Haptics.impact({style: ImpactStyle.Medium});
        // const { value } = await Dialog.confirm({
        //     title: 'Confirm',
        //     message: `Are you sure you'd like to press the red button?`,
        // });
        //
        // alert(value)
    };

    const history = useHistory();

    async function performBiometricVerificatin() {

        try {
            const fingerPrintAuth = new FingerPrintAuth();
            const data = await fingerPrintAuth.available();
            const hasFingerPrintOrFaceAuth = data.has;
            const touch = data.touch;
            const face = data.face;

            console.log("touch===>", touch);
            console.log("face===>", face);

            if (touch) {
                fingerPrintAuth.verify({
                    title: '고경준 천재냄이십니까???????', // optional title (used only on Android)
                    message: 'Scan your finger', // optional (used on both platforms) - for FaceID on iOS see the notes about NSFaceIDUsageDescription
                    authenticationValidityDuration: 0, // optional (used on Android, default 5)
                    useCustomAndroidUI: false,// set to true to use a different authentication screen (see below)
                    fallbackTitle: "Enter your PaSsWorD ",//The localized title for the fallback button in the dialog presented to the user during authentication.
                    cancelTitle: "Get me out //The localized title for the cancel button in the dialog presented to the user during authentication"
                }).then(() => {
                    alert('fingerPrintAuth success!!!!!!!!')
                }).catch(err => {
                    console.log(`Biometric ID NOT OK: ${JSON.stringify(err)}`)
                    alert('fingerPrintAuth failed!!!!!')
                });
            } else {
                alert('사용불가!! 지문등록 안됨')
            }


        } catch (e) {
            alert("웹에서는 지원 안됩니당~~~")
        }

    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1asdasdas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className="App">
                    <div>
                        <a href="https://vitejs.dev" target="_blank">
                            <img src="/vite.svg" className="logo" alt="Vite logo"/>
                        </a>
                        <View>
                            <AButton title={'push'} onClick={() => {
                                history.push('/DetailScreen')
                            }}>
                                DetailScreen
                            </AButton>
                        </View>
                        <View style={{height: 30}}/>
                        <View>
                            <AButton onClick={() => {
                                performBiometricVerificatin()
                            }}>
                                고경준 천재님이십니디sdlfksdlkf____33333
                            </AButton>
                        </View>
                        <View>
                            <AButton onClick={() => {
                                performBiometricVerificatin()
                            }}>
                                고경준 천재님이십니디sdlfksdlkf____33333
                            </AButton>
                        </View>

                        <View>
                            <AButton onClick={() => {
                                setIsOpen(true)
                            }}>
                                setIsOpen
                            </AButton>
                        </View>
                        <IonItem>
                            <IonInput label="고경준천재" labelPlacement={'stacked'}
                                      placeholder="Enter company name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="고경준천재" labelPlacement={'stacked'}
                                      placeholder="Enter company name"></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput label="고경준천재" labelPlacement={'stacked'}
                                      placeholder="Enter company name"></IonInput>
                        </IonItem>

                        <View style={{marginTop: 10,}}>
                            <AButton title={'CastScreen'} onClick={async () => {
                                const init = await CapacitorVideoPlayer.initPlayer({
                                    mode: "fullscreen",
                                    url: 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4',
                                    playerId: "fullscreen",
                                    componentTag: "div"
                                })
                            }}>
                                youtube
                            </AButton>
                        </View>
                        <View style={{height: 50}}/>
                        <View style={{justifyContent: "space-between", margin: 30,}}>
                            <AButton type={"primary"} onClick={() => {
                                showInitAdmob();
                            }}>
                                showInitAdmob
                            </AButton>
                            <View style={{height: 30,}}/>
                            <AButton type={"primary"} onClick={() => {
                                showInitAdmob();
                            }}>
                                admob
                            </AButton>
                            <View style={{height: 30,}}/>
                            <IonActionSheet
                                style={{zIndex: 9999999}}
                                isOpen={isOpen}
                                mode={'ios'}
                                header="Kyungjooongogogogo"
                                buttons={[
                                    {
                                        text: 'Delete',
                                        role: 'destructive',
                                        data: {
                                            action: 'delete'
                                        }
                                    },
                                    {
                                        text: 'Share',
                                        data: {
                                            action: 'share'
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        data: {
                                            action: 'cancel'
                                        }
                                    }
                                ]}
                                onDidDismiss={() => setIsOpen(false)}
                            ></IonActionSheet>
                            <AButton type={"dashed"} onClick={async () => {
                                await Toast.show({
                                    text: 'Hello!',
                                });
                            }}>
                                Toast222222
                            </AButton>
                            <View style={{height: 20}}/>
                            <AButton type={"primary"} onClick={async () => {
                                history.push('/QrScannerScreen')
                            }}>
                                startScan
                            </AButton>
                            <View style={{height: 20}}/>
                            <AButton type={"primary"} onClick={async () => {
                                YoutubeVideoPlayer.openVideo('Dmn7tTaNM-I', (result) => {
                                    alert(JSON.stringify(result))
                                });

                            }}>
                                youtubr!!asdasdasdasdasd
                            </AButton>
                            <View style={{height: 20}}/>
                            <AButton type={"primary"} onClick={async () => {
                                showConfirm()
                            }}>
                                showConfirm
                            </AButton>
                        </View>
                        {<View style={{height: 350,}}>
                            {loading && <Spin size={'large'}/>}
                            <ScrollView>
                                {!loading && sharedService.results.map((item, index) => {
                                    return (
                                        <View key={index.toString()}>
                                            <div>{item.title}</div>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>}
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

