import React from "react";
import { Collapse, Typography } from "antd";
import "../styles/FAQ.css";

const { Title } = Typography;
const { Panel } = Collapse;

export default function FAQ() {
    return (
        <div className="faq-container">
            <Title className="faq-title" style={{ color: '#4caf50' }}>Întrebări frecvente</Title>
            <Collapse accordion className="faq-collapse">
                <Panel header="Ce este HealthYES?" key="1">
                    <p>
                        HealthYES este un sistem expert care oferă diagnosticare preventivă pe baza simptomelor introduse de utilizator. Nu înlocuiește o consultație medicală, ci oferă sfaturi generale.
                    </p>
                </Panel>
                <Panel header="Este gratuit?" key="2">
                    <p>
                        Da, aplicația este complet gratuită pentru toți utilizatorii.
                    </p>
                </Panel>
                <Panel header="Cât de precise sunt sugestiile oferite?" key="3">
                    <p>
                        Sistemul oferă sugestii bazate pe simptomele furnizate, folosind o logică expertă. Totuși, pentru diagnostic sigur, se recomandă consultarea unui medic.
                    </p>
                </Panel>
                <Panel header="Îmi sunt salvate datele introduse?" key="4">
                    <p>
                        Nu. Datele introduse de tine nu sunt stocate și rămân complet anonime.
                    </p>
                </Panel>
                <Panel header="Pot folosi aplicația pe telefon?" key="5">
                    <p>
                        Da, aplicația este optimizată pentru dispozitive mobile, astfel încât să o poți folosi ușor oriunde.
                    </p>
                </Panel>
            </Collapse>
        </div>
    );
};