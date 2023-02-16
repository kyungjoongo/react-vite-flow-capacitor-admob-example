// @flow
import React, {useEffect} from 'react'
import './App.css'
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {App} from "@capacitor/app";
import {useHistory} from "react-router";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {View} from "react-native-web";


export default function QrScannerScreen(props) {


    useEffect(() => {
        App.addListener('backButton', async data => {
            goBackAction();
        });

        startScan()
        return () => {

        };

    }, []);

    async function goBackAction() {
        document.body.style.background = "";
        document.body.style.opacity = "1";
        await BarcodeScanner.stopScan()
        history.goBack();
    }

    const history = useHistory();

    const startScan = async () => {
        let _result = await BarcodeScanner.checkPermission({force: true});
        document.body.style.opacity = "0.5";
        document.body.style.background = "transparent";
        await BarcodeScanner.hideBackground(); // make background of WebView transparent
        const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
        // if the result has content
        if (result.hasContent) {
            alert(result.content)
            await goBackAction();
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>scanner page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <body>
                <div className="sample-background">
                </div>
                <div className="container">
                    <div className="barcode-scanner--area--container">
                        <div className="relative">
                            <p>Aim your camera at a barcode</p>
                        </div>
                        <div className="square surround-cover">
                            <div className="barcode-scanner--area--outer surround-cover">
                                <div className="barcode-scanner--area--inner"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <View style={{
                    borderWidth: 5,
                    borderStyle: "solid",
                    borderColor: 'red',
                    height: 300,
                    margin: 50,
                    marginTop: 110
                }}>

                </View>
                </body>
            </IonContent>
        </IonPage>
    )
}

