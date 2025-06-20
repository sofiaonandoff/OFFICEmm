import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InitialInfo from './pages/InitialInfo';
/*import WorkspaceInfo from './pages/WorkspaceInfo';
import MeetingRoomInfo from './pages/MeetingRoomInfo';
import AdditionalSpaceInfo from './pages/AdditionalSpaceInfo';
*/
import DesignPreview from './pages/DesignPreview';
import './App.css';

function App() {
  return (
    <Router basename="/officemm">
      <div className="App">
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
            <Route path="/" element={<Navigate to="/initial-info" replace />} />
            <Route path="/initial-info" element={<InitialInfo />} />
            <Route path="/design-preview" element={<DesignPreview />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
/*
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
                    <Route path="/" element={<InitialInfo />} />

          <Route path="/" element={<Navigate to="/initial-info" replace />} />
          <Route path="/initial-info" element={<InitialInfo />} />
          <Route path="/workspace-info" element={<WorkspaceInfo />} />
          <Route path="/meetingroom-info" element={<MeetingRoomInfo />} />
          <Route path="/additional-space-info" element={<AdditionalSpaceInfo />} />
          <Route path="/design-preview" element={<DesignPreview />} />
        </Routes>
      </div>
    </Router>
  );
}
*/
export default App;
