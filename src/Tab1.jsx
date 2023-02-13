import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router";

export default function Tab1() {

    const history = useHistory()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1asdasdas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1234234</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div>
                    sdlfksdlkflsdkf
                </div>
                <div>
                    sdlfksdlkflsdkf
                </div>
                <div>
                    고경준 천재님이십니단이fksdlkflsdkflskdlfk
                </div>
                <IonButton onClick={() => {
                    history.push('/Tab2')
                }}>
                    slkfdlskf
                </IonButton>
            </IonContent>
        </IonPage>
    );
}
