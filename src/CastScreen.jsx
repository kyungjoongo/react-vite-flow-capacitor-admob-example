import {useState} from 'react'
import './App.css'
import FullscreenPlayer from './FullScreenPlayer'
import React from 'react'
import {App} from "@capacitor/app";


export default function CastScreen() {
    const [count, setCount] = useState(0)
    const [url, setUrl] = useState({temporary_url: 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4'})

    const renderComponent = () => {
        if (count === 0) {
            return (
                <FullscreenPlayer attachment={url}/>
            )
        } else {
            return null;
        }
    }
    /*
            <FullscreenPlayer attachment={url} ></FullscreenPlayer>
    */

    return (
        <div className="App">
            <header className="App-header">
                <p>Hello Vite + React!</p>
                <p>
                    <button type="button" onClick={() => setCount((count) => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                {renderComponent()}
            </header>
        </div>
    )
}
