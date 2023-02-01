import {useState} from 'react'
import './App.css'
import {useNavigate} from "react-router";
import React from 'react'
import {Modal, Button} from "antd";

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
        <div className="App">
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

