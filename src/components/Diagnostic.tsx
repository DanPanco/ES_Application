import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, Typography, message as antMessage } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Diagnostic.css';
import '@ant-design/v5-patch-for-react-19';

const { Title } = Typography;

interface Message {
    sender: 'user' | 'ai';
    content: string;
}

interface PuterResponse {
    index: number;
    message: { content: string };
    logprobs: any;
    finish_reason: string;
    usage: Array<{ type: string; model: string; amount: number; cost: number }>;
    via_ai_chat_service: boolean;
}

export default function Diagnostic() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const formatMessage = (content: string): string => {
        return content.replace(/\*\*(.*?)\*\*/g, '$1');
    };

    useEffect(() => {
        // Mesaj de întâmpinare de la AI
        const initialMessage: Message = {
            sender: 'ai',
            content: "Bun venit! Sunt asistentul tău pentru diagnosticare preventivă. Te rog să îmi spui ce simptome ai observat recent sau ce obiceiuri de sănătate ai vrea să discutăm."
        };
        setMessages([initialMessage]);
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { sender: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const messagesToSend = [
                {
                    role: "system",
                    content: `
                    Ești un asistent virtual într-un sistem expert pentru diagnosticare preventivă a patologiilor. 
                    Scopul tău este să adresezi utilizatorului întrebări clare despre simptomele și obiceiurile acestuia. 
                    Informațiile și recomandările tale sunt exclusiv pentru scopuri informative și preventive și nu înlocuiesc consultul sau diagnosticul medical. 
                    Nu oferi niciun fel de preparate, tratamente sau soluții medicale specifice. 
                    Ghidează utilizatorul cu întrebări relevante, dar recomandă consultarea unui medic specializat pentru un diagnostic corect și tratament adecvat. 
                    Pentru un diagnostic precis și un tratament corespunzător, utilizatorul trebuie să consulte un medic.
                    De asemenea, nu răspunde cu fraze inutile sau standard, cum ar fi „Îmi pare rău” sau alte expresii care nu contribuie la oferirea unui răspuns util.
                    Nu adresa prea multe întrebări concomitent, în caz că adresezi două sau mai multe întrebări, separăle astfel ca să înceapă din rând nou.
                    Concentrează-te pe a adresa întrebări și oferi informații relevante pentru utilizator. Dacă nu ai suficiente informații pentru a răspunde, întreabă utilizatorul pentru mai multe detalii, fără a adăuga comentarii sau scuze.
                    Utilizează doar limba română.`
                },
                {
                    role: "user",
                    content: input
                }
            ];

            const response: PuterResponse = await (window as any).puter.ai.chat(messagesToSend, {
                model: 'gpt-4o'
            });

            const aiMessage: Message = {
                sender: 'ai',
                content: formatMessage(response.message.content)
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Eroare la Puter API:', error);
            antMessage.error('Eroare la conectarea cu ChatGPT');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !loading) sendMessage();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="diagnostic-container">
            <Card className="chat-card">
                <Title className="chat-title" level={2} style={{ textAlign: 'center', color: '#4caf50' }}>Chat cu HealthYES</Title>
                <div className="chat-box">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-icon">
                                    {msg.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                                </div>
                                <div className="message-content">
                                    <span>{msg.content}</span>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <Input
                            placeholder="Scrie un mesaj..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={loading}
                        />
                        {/*<Button
                            className="input-button"
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            loading={loading}
                        />*/}
                    </div>
                </div>
            </Card>
        </div>
    );
}
