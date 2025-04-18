import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.jpg'

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="header">
            <Link to="/" className="logo">
                <img src={logo} alt="Logo" className="logo-img" />
                <span className="logo-text">HealthYES</span>
            </Link>

            <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Acasă</Link>
                <Link to="/diagnostic" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Diagnostic</Link>
                <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Despre</Link>
                <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                <Link to="/faq" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
            </div>

            <button className="mobile-toggle" onClick={toggleMobileMenu}>
                ☰
            </button>
        </nav>
    );
}
