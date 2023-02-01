import React, {useEffect} from 'react';
import {CapacitorVideoPlayer} from 'capacitor-video-player';
//import './FullscreenPlayer.css';

const FullscreenPlayer = (props) => {
    useEffect( () => {
        const playVideo = async () => {
            const url = props.attachment.path
                ? props.attachment.path
                : props.attachment.temporary_url
            console.log(`url: ${url}`)
            const init = await CapacitorVideoPlayer.initPlayer({
                mode: "fullscreen",
                url: url,
                playerId: "fullscreen",
                componentTag: "div"
            })
            console.log(`init ${JSON.stringify(init)}`)
            /*            const play = await CapacitorVideoPlayer.play({
                            playerId:'fullscreen'
                        })
                        console.log(`play ${JSON.stringify(play)}`)
            */
        }
        playVideo(() => {
            console.log('in playing video')
        })
    });
    return (
        <div id="fullscreen" slot="fixed">
        </div>
    )
}
export default FullscreenPlayer