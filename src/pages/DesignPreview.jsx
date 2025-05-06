import { useLocation } from 'react-router-dom';
import '../styles/DesignPreview.css';

const DesignPreview = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div className="design-preview-container">
      <h2>오피스 설계 미리보기</h2>
      <div className="preview-content">
        <div className="preview-section">
          <h2>입력된 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>기본 정보</h3>
              <p>공간 크기: {formData?.spaceSize}평</p>
              <p>예산 범위: {formData?.budget}</p>
              <p>공간 목적: {formData?.purpose}</p>
            </div>
            <div className="info-item">
              <h3>개인 업무공간</h3>
              <p>워크스테이션: {formData?.workstations.count}개 ({formData?.workstations.size}cm)</p>
              <p>폰룸: {formData?.phoneRooms.count}개</p>
              <p>포커스룸: {formData?.focusRooms.count}개</p>
            </div>
            <div className="info-item">
              <h3>회의실</h3>
              {Object.entries(formData?.meetingRooms || {}).map(([type, data]) => (
                data.count > 0 && (
                  <p key={type}>
                    {type === 'small' && '소형 회의실'}
                    {type === 'medium' && '중형 회의실'}
                    {type === 'large' && '대형 회의실'}
                    {type === 'conference' && '컨퍼런스룸'}: {data.count}개
                  </p>
                )
              ))}
            </div>
            <div className="info-item">
              <h3>추가 공간</h3>
              {Object.entries(formData?.additionalSpaces || {}).map(([type, data]) => (
                data.required && (
                  <p key={type}>
                    {type === 'canteen' && '캔틴'}
                    {type === 'lounge' && '라운지'}
                    {type === 'breakRoom' && '휴게실'}
                    {type === 'storage' && '보관실'}
                    {type === 'exhibition' && '전시공간'}
                    {data.size && ` (${data.size})`}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="preview-section">
          <h2>AI 설계 진행 중...</h2>
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <p>최적의 오피스 레이아웃을 설계하고 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPreview; 