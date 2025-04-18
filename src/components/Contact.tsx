import React, { useEffect } from "react";
import { Form, Input, Button, message, Typography, Row, Col } from "antd";
import emailjs from "@emailjs/browser";

const { Title, Paragraph } = Typography;

export default function Contact(){
    const [form] = Form.useForm();

    useEffect(() => {
        emailjs.init({
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "rHB531u2LTp5Ov01F",
        });
    }, []);

    const sendEmail = (values: any) => {
        const templateParams = {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
        };

        emailjs
            .send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_gi1s07o",
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_b624jjp",
                templateParams
            )
            .then(() => {
                message.success("Mesajul a fost trimis cu succes!");
                form.resetFields();
            })
            .catch(() => {
                message.error("A apărut o eroare la trimiterea mesajului.");
            });
    };

    return (
        <Row justify="center" align="middle">
            <Col xs={24} sm={20} md={12} lg={10}>
                <Title level={2} style={{ textAlign: "center", color: "#4caf50" }}>
                    Contactează-ne
                </Title>
                <Paragraph style={{ textAlign: "center" }}>
                    Trimite-ne un mesaj și îți vom răspunde cât mai curând.
                </Paragraph>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={sendEmail}
                    style={{
                        background: "#fff",
                        padding: 24,
                        borderRadius: 16,
                        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Nume"
                        rules={[{ required: true, message: "Introdu numele tău" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Introdu adresa ta de email" },
                            { type: "email", message: "Email invalid" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="subject"
                        label="Subiect"
                        rules={[{ required: true, message: "Introdu subiectul mesajului" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="message"
                        label="Mesaj"
                        rules={[{ required: true, message: "Scrie mesajul tău" }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button variant="outlined" htmlType="submit" block size="large" style={{ color: '#4caf50', border: '1px solid #4caf50'}}>
                            Trimite mesajul
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};
