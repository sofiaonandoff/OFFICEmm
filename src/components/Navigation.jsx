import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          OFFICEmm
        </Link>
        <div className="nav-links">
          <Link to="/service">서비스 소개</Link>
          <Link to="/portfolio">포트폴리오</Link>
          <Link to="/about">회사 소개</Link>
          <Link to="/contact" className="contact-button">상담 신청</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 