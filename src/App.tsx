import React from 'react';
import '@ant-design/v5-patch-for-react-19';
import { Routes, Route } from 'react-router';
import { Layout } from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Diagnostic from './components/Diagnostic';
import FAQ from "./components/FAQ";
import './App.css';

const { Content } = Layout;

function App() {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header />
                <Content className="main-content">
                    <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/diagnostic" element={<Diagnostic />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/faq" element={<FAQ />} />
                    </Routes>
                    </div>
                </Content>
            <Footer />
        </Layout>
    );
}

export default App;
