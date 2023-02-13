// @flow
import React, {useEffect, useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route,} from "react-router-dom";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import {ConfigProvider} from "antd";
import {App} from '@capacitor/app';
import QrScannerScreen from "./QrScannerScreen";
import YoutubeScreen from "./YoutubeScreen";
import BiometricScreen from "./BiometricScreen";
import CastScreen from "./CastScreen";
import {PushNotifications} from '@capacitor/push-notifications';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import {IonReactRouter} from "@ionic/react-router";
import Tab1 from "./Tab1.jsx";
import Tab2 from "./Tab2.jsx";

setupIonicReact();

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
            {/*<Router>*/}

            {/*    <div className="container">*/}
            {/*        <Routes>*/}

            {/*        </Routes>*/}
            {/*    </div>*/}

            {/*</Router>*/}
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        {/*<Route exact path="/" component={Tab1}/>*/}
                        {/*<Route exact path="/Tab2" component={Tab2}/>*/}
                        <Route exact path="/" component={MainScreen}/>
                        <Route path="/DetailScreen" component={DetailScreen}/>
                        {/*<Route path="/CastScreen" component={<CastScreen/>}/>*/}
                        {/*<Route path="/QrScannerScreen" component={<QrScannerScreen/>}/>*/}
                        {/*<Route path="/YoutubeScreen" component={<YoutubeScreen/>}/>*/}
                        {/*<Route path="/BiometricScreen" component={<BiometricScreen/>}/>*/}
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </ConfigProvider>
    )
}

export default MainApp
