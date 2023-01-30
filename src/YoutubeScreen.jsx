import React from 'react';
import YouTube from 'react-youtube';
import {View} from "react-native-web";

export default function YoutubeScreen() {
    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.playVideo()
    }
    const opts = {
        height: 250,
        width: window.innerWidth,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    return (
        <View>
            <YouTube videoId="Dmn7tTaNM-I" opts={opts}/>
        </View>
    )
}
