import {Button, Modal, Alert, Checkbox, CheckboxChangeEvent, Row, Col, Typography} from "antd";
import { HomeOutlined, ExperimentOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import React, {useState} from "react";
import {useNavigate} from "react-router";
import '../styles/Home.css';
import logo from '../assets/intro.png'

const { Title, Paragraph } = Typography;

export default function Home(){
    const [isModalOpen1, setIsModalOpen1] = useState(() => {
        return sessionStorage.getItem("hasSeenWarning") !== "true";
    });

    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [isOkEnabled, setIsOkEnabled] = useState(false);

    const handleOk = () => {
        sessionStorage.setItem("hasSeenWarning", "true");
        setIsModalOpen1(false);
        setIsModalOpen2(true);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsOkEnabled(e.target.checked);
    };

    const navigate = useNavigate();

    return <div className="home-container">
        <Modal
            open={isModalOpen1}
            onOk={handleOk}
            okButtonProps={{ disabled: !isOkEnabled }}
            closable={false}
            maskClosable={false}
            title="Avertisment"
        >
            <Alert
                message="Avertisment important"
                description={
                    <>
                        Acest sistem expert are scop exclusiv informativ și preventiv. Informațiile și recomandările oferite NU înlocuiesc consultul, diagnosticul sau tratamentul realizat de personal medical calificat.
                        Sistemul sugerează posibile afecțiuni pe baza simptomelor furnizate, oferind sfaturi generale pentru ameliorarea stării și recomandări de la specialiști potriviți.
                        Pentru un diagnostic corect și tratament adecvat, vă rugăm să consultați un medic specializat.
                        <br />
                        <br />
                        <Checkbox onChange={handleCheckboxChange}>
                            Confirm că am citit și am înțeles acest mesaj.
                        </Checkbox>
                    </>
                }
                type="warning"
                showIcon
            />
        </Modal>

        <Modal
            open={isModalOpen2}
            onCancel={() => setIsModalOpen2(false)}
            footer={null}
            centered
            title="Navigare rapidă"
        >
            <Row gutter={[0, 16]} justify="center">
                <Col span={24}>
                    <Button
                        icon={<HomeOutlined />}
                        block
                        size="large"
                        onClick={() => {
                            setIsModalOpen2(false);
                            navigate('/');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        Pagina principală
                    </Button>
                </Col>
                <Col span={24}>
                    <Button
                        icon={<ExperimentOutlined />}
                        block
                        size="large"
                        onClick={() => {
                            setIsModalOpen2(false);
                            navigate('/diagnostic');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        Diagnostic
                    </Button>
                </Col>
                <Col span={24}>
                    <Button
                        icon={<QuestionCircleOutlined />}
                        block
                        size="large"
                        onClick={() => {
                            setIsModalOpen2(false);
                            navigate('/faq');
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        Întrebări frecvente
                    </Button>
                </Col>
            </Row>
        </Modal>

        <Row
            justify="center"
            align="middle"
            gutter={[40, 48]}
            className="intro-section row-container"
        >
            <Col xs={24} md={12} className="intro-text">
                <Title className="intro-title" style={{ color: '#4caf50' }}>Bine ai venit la HealthYES</Title>
                <Paragraph className="description">
                    HealthYES este sistemul tău personalizat de diagnostic preventiv, care te ajută să îți monitorizezi starea de sănătate și să îți previi problemele.
                </Paragraph>
                <ul className="intro-list">
                    <li>Analizează-ți simptomele</li>
                    <li>Înțelege-ți starea de sănătate</li>
                    <li>Primește recomandări personalizate</li>
                    <li>Pregătește-te pentru o vizită la medic</li>
                </ul>
                <Button className="intro-button" variant="outlined" size="large" href="/diagnostic" style={{ color: '#4caf50', border: '1px solid #4caf50'}}>
                    Începe diagnosticarea
                </Button>
            </Col>

            <Col xs={24} md={12} className="intro-image">
                <img
                    src={logo}
                />
            </Col>
        </Row>



        <Row justify="center" className="benefits-section row-container">
            <Col span={24}>
                <Title level={2} className="benefits-title">De ce să folosești HealthYES?</Title>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={8} className="benefit-item">
                        <Title level={4}>Rapid și eficient</Title>
                        <Paragraph>Obține rezultate în doar câteva minute, fără a fi nevoie de vizite la medic.</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} md={8} className="benefit-item">
                        <Title level={4}>Anonim</Title>
                        <Paragraph>Fii sigur că toate datele tale sunt confidențiale și nu vor fi folosite pentru altceva.</Paragraph>
                    </Col>
                    <Col xs={24} sm={12} md={8} className="benefit-item">
                        <Title level={4}>Recomandări personalizate</Title>
                        <Paragraph>Fiecare diagnostic este adaptat la nevoile tale specifice, bazat pe simptomele tale.</Paragraph>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
};