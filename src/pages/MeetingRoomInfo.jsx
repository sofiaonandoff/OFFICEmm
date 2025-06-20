import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MeetingRoomInfo.css';

const MeetingRoomInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      ...formData,
      meetingRooms: {
        small: {
          count: parseInt(form.smallMeetingRoomsCount.value) || 0,
          size: form.smallMeetingRoomsSize.value
        },
        medium: {
          count: parseInt(form.mediumMeetingRoomsCount.value) || 0,
          size: form.mediumMeetingRoomsSize.value
        },
        large: {
          count: parseInt(form.largeMeetingRoomsCount.value) || 0,
          size: form.largeMeetingRoomsSize.value
        },
        conference: {
          count: parseInt(form.conferenceRoomsCount.value) || 0,
          size: form.conferenceRoomsSize.value
        }
      }
    };

    navigate('/additional-space-info', { state: { formData: data } });
  };

  const handleGoBack = () => {
    navigate('/workspace-info', { state: { formData } });
  };

  return (
    <div className="meeting-room-info-container">
      <h2>회의실 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-section">
            <h3>소형 회의실 (4-6인)</h3>
            <div className="input-group">
              <input
                type="number"
                name="smallMeetingRoomsCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.meetingRooms?.small?.count || 0}
              />
              <select name="smallMeetingRoomsSize" required defaultValue={formData.meetingRooms?.small?.size || '3x4'}>
                <option value="3x4">3x4m</option>
                <option value="3.5x4">3.5x4m</option>
                <option value="4x4">4x4m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>중형 회의실 (6-8인)</h3>
            <div className="input-group">
              <input
                type="number"
                name="mediumMeetingRoomsCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.meetingRooms?.medium?.count || 0}
              />
              <select name="mediumMeetingRoomsSize" required defaultValue={formData.meetingRooms?.medium?.size || '4x5'}>
                <option value="4x5">4x5m</option>
                <option value="4.5x5">4.5x5m</option>
                <option value="5x5">5x5m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>대형 회의실 (8-12인)</h3>
            <div className="input-group">
              <input
                type="number"
                name="largeMeetingRoomsCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.meetingRooms?.large?.count || 0}
              />
              <select name="largeMeetingRoomsSize" required defaultValue={formData.meetingRooms?.large?.size || '5x6'}>
                <option value="5x6">5x6m</option>
                <option value="6x6">6x6m</option>
                <option value="6x7">6x7m</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>컨퍼런스룸 (12인 이상)</h3>
            <div className="input-group">
              <input
                type="number"
                name="conferenceRoomsCount"
                placeholder="수량"
                min="0"
                required
                defaultValue={formData.meetingRooms?.conference?.count || 0}
              />
              <select name="conferenceRoomsSize" required defaultValue={formData.meetingRooms?.conference?.size || '6x8'}>
                <option value="6x8">6x8m</option>
                <option value="7x8">7x8m</option>
                <option value="8x8">8x8m</option>
              </select>
            </div>
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

export default MeetingRoomInfo; 