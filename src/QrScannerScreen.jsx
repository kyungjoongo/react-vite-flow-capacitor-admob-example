// @flow
import React, {useEffect} from 'react'
import './App.css'
//import {useNavigate} from "react-router";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {App} from "@capacitor/app";
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";


export default function QrScannerScreen(props) {


    useEffect(() => {
        startScan()
        App.addListener('backButton', async data => {
            await BarcodeScanner.stopScan()
            navigate(-1)
        });
        return () => {
        };
    }, []);


    //const navigate = useNavigate();

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
            navigate(-1)
        }
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1asdasdas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    )
}

