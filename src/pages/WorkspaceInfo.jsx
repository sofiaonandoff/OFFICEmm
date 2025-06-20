import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/WorkspaceInfo.css';

const WorkspaceInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      ...formData,
      workStyle: form.workStyle.value,
      seatingType: form.seatingType.value,
      workStyleFlexibility: form.workStyleFlexibility.value,
      workstations: {
        count: parseInt(form.workstationsCount.value) || 0,
        size: form.workstationsSize.value
      },
      lockers: {
        count: parseInt(form.lockersCount.value) || 0
      },
      focusRooms: {
        single: {
          count: parseInt(form.focusRoomsSingleCount.value) || 0
        },
        double: {
          count: parseInt(form.focusRoomsDoubleCount.value) || 0
        }
      },
      executiveRooms: {
        count: parseInt(form.executiveRoomsCount.value) || 0
      }
    };

    navigate('/meetingroom-info', { state: { formData: data } });
  };

  const handleGoBack = () => {
    navigate('/initial-info', { state: { formData } });
  };

  return (
    <div className="workspace-info-container">
      <h2>업무 공간 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <h3>업무 형태</h3>
            <select name="workStyle" required defaultValue={formData.workStyle || ''}>
              <option value="">선택해주세요</option>
              <option value="startup">스타트업</option>
              <option value="finance">재무/금융</option>
              <option value="tech">IT/기술</option>
              <option value="creative">크리에이티브</option>
              <option value="consulting">컨설팅</option>
              <option value="research">연구/개발</option>
              <option value="marketing">마케팅</option>
              <option value="general">일반 사무</option>
            </select>
          </div>

          <div className="form-section">
            <h3>좌석제도</h3>
            <select name="seatingType" required defaultValue={formData.seatingType || ''}>
              <option value="">선택해주세요</option>
              <option value="fixed">고정좌석제</option>
              <option value="flexible">자율좌석제</option>
            </select>
          </div>

          <div className="form-section">
            <h3>업무 공간 유연성</h3>
            <select name="workStyleFlexibility" required defaultValue={formData.workStyleFlexibility || ''}>
              <option value="">선택해주세요</option>
              <option value="high">매우 유연</option>
              <option value="medium">중간</option>
              <option value="low">제한적</option>
            </select>
          </div>

          <div className="form-section">
            <h3>워크스테이션</h3>
            <div className="input-group">
              <input
                type="number"
                name="workstationsCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.workstations?.count || 0}
              />
              <select name="workstationsSize" required defaultValue={formData.workstations?.size || '140x70'}>
                <option value="140x70">140x70cm</option>
                <option value="160x80">160x80cm</option>
                <option value="180x80">180x80cm</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>개인 락커</h3>
            <input
              type="number"
              name="lockersCount"
              placeholder="수량"
              min="0"
              required
              defaultValue={formData.lockers?.count || 0}
            />
          </div>

          <div className="form-section">
            <h3>포커스룸</h3>
            <div className="input-group">
              <input
                type="number"
                name="focusRoomsSingleCount"
                placeholder="1인실 수량"
                min="0"
                required
                defaultValue={formData.focusRooms?.single?.count || 0}
              />
              <input
                type="number"
                name="focusRoomsDoubleCount"
                placeholder="2인실 수량"
                min="0"
                required
                defaultValue={formData.focusRooms?.double?.count || 0}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>임원실(사무실)</h3>
            <input
              type="number"
              name="executiveRoomsCount"
              placeholder="수량"
              min="0"
              required
              defaultValue={formData.executiveRooms?.count || 0}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={handleGoBack}>
            이전
          </button>
          <button type="submit" className="next-button">
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkspaceInfo; 