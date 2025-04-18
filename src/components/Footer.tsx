import React from 'react';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} HealthYES. Toate drepturile rezervate.</p>
            </div>
        </footer>
    );
}
