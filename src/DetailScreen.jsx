import {useState} from 'react'
import './App.css'
import {useNavigate} from "react-router";
import {Button} from "react-native-web";
import React from 'react'
export default function DetailScreen() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate();


    return (
        <div className="App">
            <div>
                DetailScreeen
            </div>
            <Button title={'back'} onPress={() => {
                navigate(-1)
            }}/>

        </div>
    )
}

