import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, Card, Typography, message as antMessage } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Diagnostic.css';
import '@ant-design/v5-patch-for-react-19';
import OpenAI from 'openai';
import {
    ChatCompletionUserMessageParam,
    ChatCompletionAssistantMessageParam,
    ChatCompletionSystemMessageParam
} from "openai/resources/chat";

type OpenAIMessage =
    | ChatCompletionUserMessageParam
    | ChatCompletionAssistantMessageParam
    | ChatCompletionSystemMessageParam;

const { Title } = Typography;

const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

interface Message {
    sender: 'user' | 'assistant';
    content: string;
}

export default function Diagnostic() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialMessage: Message = {
            sender: 'assistant',
            content: "Bun venit! Sunt asistentul tău pentru diagnosticare preventivă. Dorești să introduci simptomele sau să completezi un formular pentru a le defini?"
        };
        setMessages([initialMessage]);
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { sender: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const chatMessages: OpenAIMessage[] = [
                {
                    role: "system",
                    content: `Ești un asistent virtual într-un sistem expert pentru diagnosticare preventivă a patologiilor. Utilizatorul alege să introducă singur simptomele
sau să completeze formular cu întrebări, pentru a afla simptomele acestuia și ce recomandări trebuie să-i oferi. Daca utilizatorul selectează formularul
îi adresezi 10 întrebări cu răspunsurile posibile Da sau Nu, care să ajute la diagnosticarea utilizatorului. Începe cu o întrebare care să identifice în care regiune a corpului utilizatorul simte dureri/disconfort, și după adresează întrebări specifice problemei utilizatorului, sau  Întrebările le adresezi luând în considerație ce răspunsuri dea utilizatorul,
pentru a afla concret ce simptome are și cum să le amelioreze fără utilizarea medicamentelor și metodelor periculoase. După ce utilizatorul a răspuns la
întrebări, scrii care sunt posibile patologii, ce medic are nevoie de consultat și recomandări pentru a calma simptomele.`
                } as ChatCompletionSystemMessageParam,
                ...updatedMessages.map((msg): OpenAIMessage => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.content
                }))
            ];

            const response = await client.chat.completions.create({
                model: "gpt-4.1",
                messages: chatMessages
            });

            const aiReply = response.choices[0]?.message?.content || '...';
            const aiMessage: Message = {
                sender: 'assistant',
                content: aiReply
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Eroare la OpenAI API:', error);
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
                <Title className="chat-title" level={2} style={{ textAlign: 'center', color: '#4caf50' }}>
                    Chat cu HealthYES
                </Title>
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
                        <Button
                            className="input-button"
                            type="primary"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                            loading={loading}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}
