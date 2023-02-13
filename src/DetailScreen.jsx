import {useState} from 'react'
import './App.css'
//import {useNavigate} from "react-router";
import React from 'react'
import {Modal, Button} from "antd";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native-web";
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import {useHistory} from "react-router";

export default function DetailScreen() {
    const [count, setCount] = useState(0)
    //  const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const history = useHistory();

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <TouchableOpacity
                            style={{flexDirection: "row"}}
                            onPress={() => {
                                history.goBack();
                            }}
                        >
                            <View>
                                <div style={{fontSize: 35, marginTop: -5, marginLeft: 3}}>&nbsp;{`<`}</div>
                            </View>
                            <IonTitle>상세 화면 입니다sdlfksdlkflkdsf</IonTitle>
                        </TouchableOpacity>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    <div style={{flex: 1, height: '100%'}}>
                        <Modal
                            title="Basic Modal"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={'100%'}
                            centered={true}
                            //transitionName="fade" transitionName="slide-up" transitionName="slide-left"
                            //transitionName={"slide-up"}
                            transitionName=""
                            // maskTransitionName="zoom-big-fast"
                            wrapClassName={'modal1'}
                        >
                            <p>Some contents.asdasdasdasd..</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                        <View style={{height: 100,}}/>
                        <Button type={'primary'} onClick={() => {
                            setIsModalOpen(true)
                        }}>
                            openModal
                        </Button>

                    </div>
                </IonContent>
            </IonPage>
        </>


    )
}

