import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export const Home = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        setIsModalOpen(true);
    }, [])

    return <div>
        Home
        <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
            <Link to="/"><Button>Home</Button></Link>
            <Link to="/about"><Button>About</Button></Link>
            <Link to="/contact"><Button>Contact</Button></Link>
        </Modal>
    </div>
}