// @flow
import React, {useEffect} from 'react'
import {Button} from "antd";
import {FingerPrintAuth} from "capacitor4-fingerprint-auth"

export default function BiometricScreen(props) {
    useEffect(() => {
        init()
        //
    }, [])

    function init() {
    }

    async function performBiometricVerificatin() {

        try {
            const fingerPrintAuth = new FingerPrintAuth();
            const data = await fingerPrintAuth.available();
            const hasFingerPrintOrFaceAuth = data.has;
            const touch = data.touch;
            const face = data.face;


            if (!hasFingerPrintOrFaceAuth) {
                alert("no hasFingerPrintOrFaceAuth")
            } else {
                fingerPrintAuth.verify({
                    title: '고경준 천재냄이십니까???????', // optional title (used only on Android)
                    message: 'Scan your finger', // optional (used on both platforms) - for FaceID on iOS see the notes about NSFaceIDUsageDescription
                    authenticationValidityDuration: 10, // optional (used on Android, default 5)
                    useCustomAndroidUI: false,// set to true to use a different authentication screen (see below)
                    fallbackTitle: "Enter your PaSsWorD ",//The localized title for the fallback button in the dialog presented to the user during authentication.
                    cancelTitle: "Get me out //The localized title for the cancel button in the dialog presented to the user during authentication"
                }).then(() => {
                    alert('fingerPrintAuth success!!!!!!!!')
                }).catch(err => {
                    console.log(`Biometric ID NOT OK: ${JSON.stringify(err)}`)
                    alert('fingerPrintAuth failed!!!!!')
                });
            }
        } catch (e) {
            alert("웹에서는 지원 안됩니당~~~")
        }

    }

    return (
        <div className="App">
            <Button type={"primary"} onClick={async () => {
                await performBiometricVerificatin()
            }}>

                눌러서 지문 인증2222
            </Button>
        </div>
    )
}

