import { useLocation } from 'react-router-dom';
import { exportOfficeData } from '../services/officeDataService';
import { sendOfficeDataEmail } from '../services/emailService';
import '../styles/DesignPreview.css';

const DesignPreview = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  const handleSubmitData = async () => {
    try {
      await sendOfficeDataEmail(formData);
      alert('감사합니다. 빠른 시일 내에 담당자가 확인 후 연락드릴 예정입니다.');
    } catch (error) {
      console.error('데이터 제출 중 오류 발생:', error);
      alert(error.message || '데이터 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const generateCSV = (data) => {
    const rows = [
      ['구분', '항목', '내용'],
      ['기본 정보', '회사명', data.companyName],
      ['', '담당자', data.contactName],
      ['', '연락처', data.contactPhone],
      ['', '이메일', data.contactEmail],
      ['', '공간 크기', `${data.spaceSize}평`],
      ['', '총 인원', `${data.totalEmployees}명`],
      ['', '예산 범위', data.budget],
      ['', '좌석제도', data.seatingType === 'fixed' ? '고정좌석제' : '자율좌석제'],
      ['', '업무 형태', {
        'startup': '스타트업',
        'finance': '재무/금융',
        'tech': 'IT/기술',
        'creative': '크리에이티브',
        'consulting': '컨설팅',
        'research': '연구/개발',
        'marketing': '마케팅',
        'general': '일반 사무'
      }[data.workStyle]],
      ['', '업무 공간 유연성', {
        'high': '매우 유연',
        'medium': '중간',
        'low': '제한적'
      }[data.workStyleFlexibility]],
      ['개인 업무공간', '워크스테이션', `${data.workstations.count}개 (${data.workstations.size}cm)`],
      ['', '개인 락커', `${data.lockers.count}개`],
      ['', '1인 포커스룸', `${data.focusRooms.single.count}개`],
      ['', '2인 포커스룸', `${data.focusRooms.double.count}개`],
      ['', '임원실(사무실)', `${data.executiveRooms.count}개`],
      ['회의실', '소형 회의실(4인)', `${data.meetingRooms.small.count}개`],
      ['', '중형 회의실(6인)', `${data.meetingRooms.medium.count}개`],
      ['', '대형 회의실(8인)', `${data.meetingRooms.large.count}개`],
      ['', '컨퍼런스룸(9인 이상)', `${data.meetingRooms.conference.count}개`]
    ];

    // 추가 공간 정보 추가
    Object.entries(data.additionalSpaces).forEach(([type, space]) => {
      if (space.required) {
        const spaceName = {
          'canteen': '캔틴',
          'lounge': '라운지',
          'breakRoom': '휴게실',
          'storage': '창고',
          'exhibition': '전시공간',
          'serverRoom': '서버실',
          'other': '기타'
        }[type];
        rows.push(['추가 공간', spaceName, space.size || '']);
      }
    });

    // CSV 문자열 생성
    return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const handleExportCSV = () => {
    try {
      const csvContent = generateCSV(formData);
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `${formData.companyName}_오피스_설계_데이터_${new Date().toLocaleDateString()}.csv`);
      link.style.visibility = 'hidden';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSV 파일 생성 중 오류 발생:', error);
      alert('CSV 파일 생성 중 오류가 발생했습니다.');
    }
  };

  // handleExportData 함수를 handleExportCSV로 대체
  const handleExportData = handleExportCSV;

  return (
    <div className="design-preview-container">
      <h2>오피스 설계 미리보기</h2>
      <div className="preview-content">
        <div className="preview-section">
          <h2>입력된 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>기본 정보</h3>
              <p>회사명: {formData?.companyName}</p>
              <p>담당자: {formData?.contactName}</p>
              <p>연락처: {formData?.contactPhone}</p>
              <p>공간 크기: {formData?.spaceSize}평</p>
              <p>오피스 총 인원: {formData?.totalEmployees}명</p>
              <p>예산 범위: {formData?.budget}</p>
              <p>좌석제도: {formData?.seatingType === 'fixed' ? '고정좌석제' : '자율좌석제'}</p>
              <p>업무 형태: {
                {
                  'startup': '스타트업',
                  'finance': '재무/금융',
                  'tech': 'IT/기술',
                  'creative': '크리에이티브',
                  'consulting': '컨설팅',
                  'research': '연구/개발',
                  'marketing': '마케팅',
                  'general': '일반 사무'
                }[formData?.workStyle]
              }</p>
              <p>업무 공간 유연성: {
                {
                  'high': '매우 유연',
                  'medium': '중간',
                  'low': '제한적'
                }[formData?.workStyleFlexibility]
              }</p>
            </div>
            <div className="info-item">
              <h3>개인 업무공간</h3>
              <p>워크스테이션: {formData?.workstations.count}개 ({formData?.workstations.size}cm)</p>
              <p>개인 락커: {formData?.lockers.count}개</p>
              <p>1인 포커스룸: {formData?.focusRooms.single.count}개</p>
              <p>2인 포커스룸: {formData?.focusRooms.double.count}개</p>
              <p>임원실(사무실): {formData?.executiveRooms.count}개</p>
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
                    {type === 'storage' && '창고'}
                    {type === 'exhibition' && '전시공간'}
                    {type === 'serverRoom' && '서버실'}
                    {type === 'other' && '기타'}
                    {data.size && ` (${data.size})`}
                  </p>
                )
              ))}
            </div>
          </div>
          <div className="data-actions">
            <button className="submit-button" onClick={handleSubmitData}>
              데이터 제출하기
            </button>
            <button className="export-button" onClick={handleExportData}>
              데이터 내보내기 (CSV)
            </button>
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