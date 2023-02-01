// @flow
import React, {useEffect, useState} from 'react'
import './App.css'
import {ScrollView, View} from "react-native-web";
import {useNavigate} from "react-router";
import {Button as AButton, Spin} from 'antd'
import {AdMob, InterstitialAdPluginEvents} from "@capacitor-community/admob";
import sharedService, {initializeAdmob, showBanner} from "./initAdmob";
import {Capacitor} from "@capacitor/core";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {Toast} from '@capacitor/toast';
import {Haptics, ImpactStyle} from "@capacitor/haptics";
import axios from "axios";
import _ from 'lodash'
import {CapacitorVideoPlayer} from "capacitor-video-player";

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
            await showBanner();
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

    const navigate = useNavigate();

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


    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo"/>
                </a>
                <View>
                    <AButton title={'push'} onClick={() => {
                        navigate('/DetailScreen')
                    }}>
                        pushasasdads
                    </AButton>
                </View>
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
                        showInitAdmob
                    </AButton>
                    <View style={{height: 20}}/>
                    <AButton type={"primary"} onClick={async () => {
                        navigate('/QrScannerScreen')
                    }}>
                        startScan
                    </AButton>
                    <View style={{height: 20}}/>
                    <AButton type={"primary"} onClick={async () => {
                        await Toast.show({
                            text: 'kyungjoon is genis!',
                            position: "center",
                        });
                    }}>
                        startScan
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
    )
}

