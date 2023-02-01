import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import {ConfigProvider} from "antd";
import {App} from '@capacitor/app';
import QrScannerScreen from "./QrScannerScreen";
import YoutubeScreen from "./YoutubeScreen";
import BiometricScreen from "./BiometricScreen";
import CastScreen from "./CastScreen";
import {PushNotifications} from '@capacitor/push-notifications';

App.addListener('backButton', ({canGoBack}) => {
    if (canGoBack) {
        window.history.back();
    } else {
        App.exitApp();
    }
});

function MainApp() {
    const [count, setCount] = useState(0)

    useEffect(() => {
        addListeners()
        registerNotifications();
        getDeliveredNotifications();
    }, [])

    const getDeliveredNotifications = async () => {
        const notificationList = await PushNotifications.getDeliveredNotifications();
        console.log('delivered notifications', notificationList);
        //alert(JSON.stringify(notificationList))
    }

    const addListeners = async () => {
        await PushNotifications.addListener('registration', token => {
            console.info('Registration token: ', token.value);
            // alert("토큰은 " + token.value)
        });

        await PushNotifications.addListener('registrationError', err => {
            console.error('Registration error: ', err.error);
        });
        await PushNotifications.addListener('pushNotificationReceived', notification => {
            //todo: push메세지가 왔을때의 리스너...
            console.log('Push notification received: ', notification);
            alert(JSON.stringify(notification))
        });
        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push notification action performed', notification.actionId, notification.inputValue);
        });
    }

    const registerNotifications = async () => {
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            //throw new Error();
            alert('push 퍼미션이 없당!')
        }

        await PushNotifications.register();
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'orange',
                },
            }}
        >
            <Router>

                <div className="container">
                    <Routes>
                        <Route path="/" element={<MainScreen/>}/>
                        <Route path="/DetailScreen" element={<DetailScreen/>}/>
                        <Route path="/CastScreen" element={<CastScreen/>}/>
                        <Route path="/QrScannerScreen" element={<QrScannerScreen/>}/>
                        <Route path="/YoutubeScreen" element={<YoutubeScreen/>}/>
                        <Route path="/BiometricScreen" element={<BiometricScreen/>}/>
                    </Routes>
                </div>

            </Router>
        </ConfigProvider>

    )
}

export default MainApp
