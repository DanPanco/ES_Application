import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import "../styles/About.css"

const { Title, Paragraph } = Typography;
export default function About() {

    return (
        <div className="about-container">
            <Row justify="center" className="about-section row-container">
                <Col xs={24} md={18} className="about-text">
                    <Title className="about-title" style={{ color: '#4caf50' }}>
                        Despre HealthYES
                    </Title>
                    <Paragraph className="about-description">
                        HealthYES este un sistem expert dedicat prevenției și diagnosticării timpurii a afecțiunilor comune. Aplicația noastră ajută utilizatorii să își monitorizeze starea de sănătate, oferindu-le recomandări personalizate bazate pe simptomele raportate.
                        Scopul nostru este să îți oferim sfaturi utile pentru prevenirea problemelor de sănătate, îmbunătățind astfel calitatea vieții tale.
                    </Paragraph>
                    <Divider />
                    <Title level={3}>Misiunea noastră</Title>
                    <Paragraph>
                        Misiunea HealthYES este de a sprijini utilizatorii să își monitorizeze sănătatea în mod activ și preventiv. Printr-o abordare simplă și accesibilă, dorim să ajutăm oamenii să identifice și să prevină afecțiunile comune, astfel încât să își poată menține un stil de viață sănătos și activ.
                    </Paragraph>
                    <Divider />
                    <Title level={3}>Cum funcționează?</Title>
                    <Paragraph>
                        Prin intermediul unui set de întrebări ghidate, utilizatorii pot descrie simptomele pe care le experimentează. După completarea chestionarului, aplicația analizează răspunsurile și furnizează recomandări personalizate pentru gestionarea simptomelor. În cazul unor simptome persistente sau grave, utilizatorii sunt sfătuiți să consulte un medic specialist pentru o evaluare detaliată.
                    </Paragraph>
                    <Divider />
                    <Title level={3}>Echipa din spatele HealthYES</Title>
                    <Paragraph>
                        HealthYES este dezvoltat de o echipă de profesioniști pasionați de tehnologie și sănătate. Expertiza noastră combinată ne permite să creăm soluții inovative care ajută utilizatorii să își monitorizeze sănătatea într-un mod ușor, rapid și sigur. Suntem dedicați îmbunătățirii continue a aplicației și implementării celor mai noi cercetări în domeniu pentru a oferi cele mai bune recomandări.
                    </Paragraph>
                </Col>
            </Row>

        </div>
    );
};