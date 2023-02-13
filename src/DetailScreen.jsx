import {useState} from 'react'
import './App.css'
import {useNavigate} from "react-router";
import React from 'react'
import {Modal, Button} from "antd";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native-web";

export default function DetailScreen() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate();
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

    return (
        <div style={{flex: 1, height: '100%'}}>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 50,
                    width: '100%',
                    backgroundColor: 'orange',
                    left: 0,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                }}
                onPress={() => {
                    navigate(-1);
                }}>
                <View style={{flex: .1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 40, marginTop: -6}}>{`<`}</Text>
                </View>
                <View style={{flex: .9, justifyContent: 'center'}}>
                    <Text>상세</Text>
                </View>
            </TouchableOpacity>
            <div>
                DetailScreeen
            </div>
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
            <Button type={'primary'} onClick={() => {
                setIsModalOpen(true)
            }}>
                openModal
            </Button>

        </div>
    )
}

