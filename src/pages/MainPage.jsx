import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import '../styles/MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navigation />
      <div className="main-page">
        <div className="hero-section">
          <h1>SPACE BETTERS WORK</h1>
          <p className="subtitle">AI가 설계하는 최적의 오피스 공간</p>
          <button
            className="start-button"
            onClick={() => navigate('/initial-info')}
          >
            무료 설계 시작하기
          </button>
        </div>

        <div className="process-section">
          <h2>AI 기반의 스마트한 오피스 설계 프로세스</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">🤖</div>
              <h3>AI 컨설팅</h3>
              <p>AI가 최적화된 질문을 통해<br />회사의 특성과 요구사항을 빠르게 파악합니다</p>
            </div>
            <div className="process-step">
              <div className="step-icon">✏️</div>
              <h3>AI 디자인</h3>
              <p>수집된 데이터를 기반으로 AI가<br />최적의 레이아웃과 3D 모델을 생성합니다</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🏗️</div>
              <h3>전문가 시공</h3>
              <p>AI 설계안을 바탕으로 전문가가<br />정밀한 시공과 품질 관리를 진행합니다</p>
            </div>
          </div>
        </div>

        <div className="portfolio-section">
          <h2>프로젝트 포트폴리오</h2>
          <div className="portfolio-grid">
            <div className="portfolio-item">
              <img src="/portfolio1.jpg" alt="프로젝트 1" />
              <div className="portfolio-info">
                <h3>스타트업 오피스</h3>
                <p>모던한 디자인의 협업 공간</p>
              </div>
            </div>
            <div className="portfolio-item">
              <img src="/portfolio2.jpg" alt="프로젝트 2" />
              <div className="portfolio-info">
                <h3>기업 사무실</h3>
                <p>효율적인 업무 공간</p>
              </div>
            </div>
            <div className="portfolio-item">
              <img src="/portfolio3.jpg" alt="프로젝트 3" />
              <div className="portfolio-info">
                <h3>공동 작업 공간</h3>
                <p>창의적인 아이디어 공유 공간</p>
              </div>
            </div>
          </div>
          <button className="view-more-button" onClick={() => navigate('/portfolio')}>
            프로젝트 더 보기
          </button>
        </div>

        <div className="contact-section">
          <h2>AI 기반 오피스 설계 상담</h2>
          <p>빠르고 정확한 AI 설계로 최적의 오피스 공간을 만나보세요</p>
          <button className="contact-button" onClick={() => navigate('/contact')}>
            무료 상담 신청하기
          </button>
        </div>
      </div>
    </>
  );
};

export default MainPage; 