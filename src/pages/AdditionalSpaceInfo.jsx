import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdditionalSpaceInfo.css';

const AdditionalSpaceInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      ...formData,
      additionalSpaces: {
        lounge: {
          count: parseInt(form.loungeCount.value) || 0,
          size: form.loungeSize.value
        },
        pantry: {
          count: parseInt(form.pantryCount.value) || 0,
          size: form.pantrySize.value
        },
        storage: {
          count: parseInt(form.storageCount.value) || 0,
          size: form.storageSize.value
        },
        server: {
          count: parseInt(form.serverCount.value) || 0,
          size: form.serverSize.value
        },
        other: form.otherSpaces.value
      }
    };

    navigate('/design-preview', { state: { formData: data } });
  };

  const handleGoBack = () => {
    navigate('/meetingroom-info', { state: { formData } });
  };

  return (
    <div className="additional-space-info-container">
      <h2>추가 공간 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <h3>라운지</h3>
            <div className="input-group">
              <input
                type="number"
                name="loungeCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.additionalSpaces?.lounge?.count || 0}
              />
              <select name="loungeSize" required defaultValue={formData.additionalSpaces?.lounge?.size || '4x6'}>
                <option value="4x6">4x6m</option>
                <option value="5x7">5x7m</option>
                <option value="6x8">6x8m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>팬트리</h3>
            <div className="input-group">
              <input
                type="number"
                name="pantryCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.additionalSpaces?.pantry?.count || 0}
              />
              <select name="pantrySize" required defaultValue={formData.additionalSpaces?.pantry?.size || '3x4'}>
                <option value="3x4">3x4m</option>
                <option value="4x4">4x4m</option>
                <option value="4x5">4x5m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>보관실</h3>
            <div className="input-group">
              <input
                type="number"
                name="storageCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.additionalSpaces?.storage?.count || 0}
              />
              <select name="storageSize" required defaultValue={formData.additionalSpaces?.storage?.size || '3x3'}>
                <option value="3x3">3x3m</option>
                <option value="3x4">3x4m</option>
                <option value="4x4">4x4m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>서버실</h3>
            <div className="input-group">
              <input
                type="number"
                name="serverCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.additionalSpaces?.server?.count || 0}
              />
              <select name="serverSize" required defaultValue={formData.additionalSpaces?.server?.size || '3x4'}>
                <option value="3x4">3x4m</option>
                <option value="4x4">4x4m</option>
                <option value="4x5">4x5m</option>
              </select>
            </div>
          </div>

          <div className="form-section full-width">
            <h3>기타 공간</h3>
            <textarea
              name="otherSpaces"
              placeholder="추가로 필요한 공간이 있다면 입력해주세요"
              rows="4"
              defaultValue={formData.additionalSpaces?.other || ''}
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

export default AdditionalSpaceInfo; 