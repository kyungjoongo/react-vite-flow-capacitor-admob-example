import React, {useState} from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import {ConfigProvider} from "antd";
import { App } from '@capacitor/app';
import QrScannerScreen from "./QrScannerScreen";
import YoutubeScreen from "./YoutubeScreen";
import BiometricScreen from "./BiometricScreen";

App.addListener('backButton', ({ canGoBack }) => {
    if(canGoBack){
        window.history.back();
    } else {
        App.exitApp();
    }
});

function MainApp() {
    const [count, setCount] = useState(0)

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
