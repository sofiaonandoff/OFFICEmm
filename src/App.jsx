import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InitialInfo from './pages/InitialInfo';
import DesignPreview from './pages/DesignPreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">OFFICEmm</div>
            <div className="service-intro">
              AI 기반 오피스 공간 설계 서비스로, 당신의 업무 환경을 최적화합니다
            </div>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<InitialInfo />} />
            <Route path="/initial-info" element={<InitialInfo />} />
            <Route path="/design-preview" element={<DesignPreview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
