import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InitialInfo.css';

const InitialInfo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    spaceSize: '',
    budget: '',
    purpose: '',
    totalEmployees: '',
    seatingType: '',
    workStyle: '',
    workStyleFlexibility: '',
    workstations: {
      count: '',
      size: '140x70', // 기본 워크스테이션 크기 (cm)
    },
    phoneRooms: {
      count: 0,
      size: '2x2m'
    },
    lockers: {
      count: '',
    },
    focusRooms: {
      single: { count: 0, size: '2x2m' },
      double: { count: 0, size: '3x2m' }
    },
    executiveRooms: {
      count: 0,
      size: '4x4m'
    },
    meetingRooms: {
      small: { count: 0, type: 'small' },
      medium: { count: 0, type: 'medium' },
      large: { count: 0, type: 'large' },
      conference: { count: 0, type: 'conference' }
    },
    additionalSpaces: {
      canteen: { required: false, size: '' },
      lounge: { required: false, size: '' },
      breakRoom: { required: false, size: '' },
      storage: { required: false, size: '' },
      exhibition: { required: false, size: '' },
      serverRoom: { required: false, size: '' },
      other: { required: false, size: '' }
    }
  });

  const seatingTypes = [
    { id: 'fixed', label: '고정좌석제', description: '개인별 지정된 자리에서 업무' },
    { id: 'flexible', label: '자율좌석제', description: '자유롭게 자리 선택 가능' }
  ];

  const workStyles = [
    { id: 'startup', label: '스타트업', icon: '🚀' },
    { id: 'finance', label: '재무/금융', icon: '💰' },
    { id: 'tech', label: 'IT/기술', icon: '💻' },
    { id: 'creative', label: '크리에이티브', icon: '🎨' },
    { id: 'consulting', label: '컨설팅', icon: '📊' },
    { id: 'research', label: '연구/개발', icon: '🔬' },
    { id: 'marketing', label: '마케팅', icon: '📈' },
    { id: 'general', label: '일반 사무', icon: '🏢' }
  ];

  const flexibilityLevels = [
    { id: 'high', label: '매우 유연', description: '자유로운 공간 활용과 이동' },
    { id: 'medium', label: '중간', description: '일정한 규칙 하에서 유연한 공간 활용' },
    { id: 'low', label: '제한적', description: '정해진 공간에서 업무 수행' }
  ];

  const meetingRoomTypes = [
    { id: 'small', label: '소형 회의실', capacity: '4명' },
    { id: 'medium', label: '중형 회의실', capacity: '6명' },
    { id: 'large', label: '대형 회의실', capacity: '8명' },
    { id: 'conference', label: '컨퍼런스룸', capacity: '9명 이상' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkstationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      workstations: {
        ...prev.workstations,
        [name]: value
      }
    }));
  };

  const handleMeetingRoomCountChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      meetingRooms: {
        ...prev.meetingRooms,
        [type]: {
          ...prev.meetingRooms[type],
          count: parseInt(value) || 0
        }
      }
    }));
  };

  const handleMeetingRoomAdd = (type) => {
    setFormData(prev => ({
      ...prev,
      meetingRooms: {
        ...prev.meetingRooms,
        [type]: {
          ...prev.meetingRooms[type],
          count: prev.meetingRooms[type].count + 1
        }
      }
    }));
  };

  const handleMeetingRoomRemove = (type) => {
    setFormData(prev => ({
      ...prev,
      meetingRooms: {
        ...prev.meetingRooms,
        [type]: {
          ...prev.meetingRooms[type],
          count: Math.max(0, prev.meetingRooms[type].count - 1)
        }
      }
    }));
  };

  const handleAdditionalSpaceToggle = (spaceType) => {
    setFormData(prev => ({
      ...prev,
      additionalSpaces: {
        ...prev.additionalSpaces,
        [spaceType]: {
          ...prev.additionalSpaces[spaceType],
          required: !prev.additionalSpaces[spaceType].required
        }
      }
    }));
  };

  const handleAdditionalSpaceSizeChange = (spaceType, value) => {
    setFormData(prev => ({
      ...prev,
      additionalSpaces: {
        ...prev.additionalSpaces,
        [spaceType]: {
          ...prev.additionalSpaces[spaceType],
          size: value
        }
      }
    }));
  };

  const handlePhoneRoomCountChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phoneRooms: {
        ...prev.phoneRooms,
        count: parseInt(value) || 0
      }
    }));
  };

  const handleFocusRoomCountChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      focusRooms: {
        ...prev.focusRooms,
        [type]: {
          ...prev.focusRooms[type],
          count: parseInt(value) || 0
        }
      }
    }));
  };

  const handleExecutiveRoomCountChange = (value) => {
    setFormData(prev => ({
      ...prev,
      executiveRooms: {
        ...prev.executiveRooms,
        count: parseInt(value) || 0
      }
    }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // 다음 단계로 이동
      navigate('/design-preview', { state: { formData } });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-container">
            <h2>기본 정보 입력</h2>
            <div className="input-group">
              <div className="input-field">
                <label>오피스 공간 크기</label>
                <div className="size-input">
                  <input
                    type="number"
                    name="spaceSize"
                    value={formData.spaceSize}
                    onChange={handleInputChange}
                    placeholder="평수 입력"
                    min="1"
                  />
                  <span className="unit">평</span>
                </div>
              </div>
              <div className="input-field">
                <label>오피스 총 인원</label>
                <div className="size-input">
                  <input
                    type="number"
                    name="totalEmployees"
                    value={formData.totalEmployees}
                    onChange={handleInputChange}
                    placeholder="인원 수 입력"
                    min="1"
                  />
                  <span className="unit">명</span>
                </div>
              </div>
              <div className="input-field">
                <label>예산 범위</label>
                <div className="budget-options">
                  {['3000만원 미만', '3000-5000만원', '5000-9000만원', '1억원 이상'].map((option) => (
                    <button
                      key={option}
                      className={`budget-option ${formData.budget === option ? 'selected' : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'budget', value: option } })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <h2>업무 공간 설정</h2>
            <div className="space-settings">
              <div className="setting-section">
                <h3>좌석제도 선택</h3>
                <div className="seating-options">
                  {seatingTypes.map((type) => (
                    <button
                      key={type.id}
                      className={`seating-option ${formData.seatingType === type.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'seatingType', value: type.id } })}
                    >
                      <h4>{type.label}</h4>
                      <p>{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-section">
                <h3>업무 형태 선택</h3>
                <div className="work-style-options">
                  {workStyles.map((style) => (
                    <button
                      key={style.id}
                      className={`work-style-option ${formData.workStyle === style.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'workStyle', value: style.id } })}
                    >
                      <span className="icon">{style.icon}</span>
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-section">
                <h3>업무 공간 유연성</h3>
                <div className="flexibility-options">
                  {flexibilityLevels.map((level) => (
                    <button
                      key={level.id}
                      className={`flexibility-option ${formData.workStyleFlexibility === level.id ? 'selected' : ''}`}
                      onClick={() => handleInputChange({ target: { name: 'workStyleFlexibility', value: level.id } })}
                    >
                      <h4>{level.label}</h4>
                      <p>{level.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <h2>상세 공간 요구사항</h2>
            <div className="space-requirements">
              <div className="requirement-section">
                <h3>개인 업무공간</h3>
                <div className="workstation-inputs">
                  <div className="input-field">
                    <label>워크스테이션</label>
                    <div className="count-input">
                      <input
                        type="number"
                        name="count"
                        value={formData.workstations.count}
                        onChange={handleWorkstationChange}
                        min="1"
                        placeholder="워크스테이션 개수"
                      />
                    </div>
                  </div>
                  <div className="input-field">
                    <label>크기 (cm)</label>
                    <select
                      name="size"
                      value={formData.workstations.size}
                      onChange={handleWorkstationChange}
                    >
                      <option value="140x70">140 x 70</option>
                      <option value="150x70">150 x 70</option>
                      <option value="160x70">160 x 70</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label>개인 락커</label>
                    <div className="count-input">
                      <input
                        type="number"
                        name="count"
                        value={formData.lockers.count}
                        onChange={(e) => handleInputChange({ target: { name: 'lockers', value: { count: e.target.value } } })}
                        min="0"
                        placeholder="락커 개수"
                      />
                    </div>
                  </div>
                </div>
                <div className="oa-space-info">
                  <p>OA 공간은 워크스테이션 수와 공간 크기에 맞춰 적정한 공간을 마련합니다.</p>
                  <p>워크스테이션 간 통로, 프린터 공간, 서류 보관 공간 등이 포함됩니다.</p>
                </div>
                <div className="personal-space-inputs">
                  <div className="space-count-input">
                    <label>1인 포커스룸</label>
                    <div className="count-controls">
                      <button
                        className="count-button"
                        onClick={() => handleFocusRoomCountChange('single', Math.max(0, formData.focusRooms.single.count - 1))}
                      >
                        -
                      </button>
                      <span className="count">{formData.focusRooms.single.count}</span>
                      <button
                        className="count-button"
                        onClick={() => handleFocusRoomCountChange('single', formData.focusRooms.single.count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="space-count-input">
                    <label>2인 포커스룸</label>
                    <div className="count-controls">
                      <button
                        className="count-button"
                        onClick={() => handleFocusRoomCountChange('double', Math.max(0, formData.focusRooms.double.count - 1))}
                      >
                        -
                      </button>
                      <span className="count">{formData.focusRooms.double.count}</span>
                      <button
                        className="count-button"
                        onClick={() => handleFocusRoomCountChange('double', formData.focusRooms.double.count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="space-count-input">
                    <label>임원실(사무실)</label>
                    <div className="count-controls">
                      <button
                        className="count-button"
                        onClick={() => handleExecutiveRoomCountChange(Math.max(0, formData.executiveRooms.count - 1))}
                      >
                        -
                      </button>
                      <span className="count">{formData.executiveRooms.count}</span>
                      <button
                        className="count-button"
                        onClick={() => handleExecutiveRoomCountChange(formData.executiveRooms.count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="requirement-section">
                <h3>회의실</h3>
                <div className="meeting-room-options">
                  {meetingRoomTypes.map((type) => (
                    <div key={type.id} className="meeting-room-type">
                      <div className="meeting-room-info">
                        <h4>{type.label}</h4>
                        <p>수용 인원: {type.capacity}</p>
                      </div>
                      <div className="meeting-room-count">
                        <button
                          className="count-button"
                          onClick={() => handleMeetingRoomCountChange(type.id, Math.max(0, formData.meetingRooms[type.id].count - 1))}
                        >
                          -
                        </button>
                        <span className="count">{formData.meetingRooms[type.id].count}</span>
                        <button
                          className="count-button"
                          onClick={() => handleMeetingRoomCountChange(type.id, formData.meetingRooms[type.id].count + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="requirement-section">
                <h3>추가 공간</h3>
                <div className="additional-spaces">
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.canteen.required}
                        onChange={() => handleAdditionalSpaceToggle('canteen')}
                      />
                      캔틴
                    </label>
                    {formData.additionalSpaces.canteen.required && (
                      <input
                        type="text"
                        placeholder="캔틴 크기 (예: 5x5m)"
                        value={formData.additionalSpaces.canteen.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('canteen', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.lounge.required}
                        onChange={() => handleAdditionalSpaceToggle('lounge')}
                      />
                      라운지
                    </label>
                    {formData.additionalSpaces.lounge.required && (
                      <input
                        type="text"
                        placeholder="라운지 크기 (예: 4x4m)"
                        value={formData.additionalSpaces.lounge.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('lounge', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.breakRoom.required}
                        onChange={() => handleAdditionalSpaceToggle('breakRoom')}
                      />
                      휴게실
                    </label>
                    {formData.additionalSpaces.breakRoom.required && (
                      <input
                        type="text"
                        placeholder="휴게실 크기 (예: 4x4m)"
                        value={formData.additionalSpaces.breakRoom.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('breakRoom', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.storage.required}
                        onChange={() => handleAdditionalSpaceToggle('storage')}
                      />
                      창고
                    </label>
                    {formData.additionalSpaces.storage.required && (
                      <input
                        type="text"
                        placeholder="창고 크기 (예: 3x3m)"
                        value={formData.additionalSpaces.storage.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('storage', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.exhibition.required}
                        onChange={() => handleAdditionalSpaceToggle('exhibition')}
                      />
                      전시공간
                    </label>
                    {formData.additionalSpaces.exhibition.required && (
                      <input
                        type="text"
                        placeholder="전시공간 크기 (예: 6x6m)"
                        value={formData.additionalSpaces.exhibition.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('exhibition', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.serverRoom.required}
                        onChange={() => handleAdditionalSpaceToggle('serverRoom')}
                      />
                      서버실
                    </label>
                    {formData.additionalSpaces.serverRoom.required && (
                      <input
                        type="text"
                        placeholder="서버실 크기 (예: 4x4m)"
                        value={formData.additionalSpaces.serverRoom.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('serverRoom', e.target.value)}
                      />
                    )}
                  </div>
                  <div className="space-option">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.additionalSpaces.other.required}
                        onChange={() => handleAdditionalSpaceToggle('other')}
                      />
                      기타
                    </label>
                    {formData.additionalSpaces.other.required && (
                      <input
                        type="text"
                        placeholder="공간 용도와 크기 입력"
                        value={formData.additionalSpaces.other.size}
                        onChange={(e) => handleAdditionalSpaceSizeChange('other', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="initial-info-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }} />
      </div>
      {renderStep()}
      <div className="navigation-buttons">
        {step > 1 && (
          <button className="back-button" onClick={() => setStep(step - 1)}>
            이전
          </button>
        )}
        <button
          className="next-button"
          onClick={handleNext}
          disabled={
            (step === 1 && (!formData.spaceSize || !formData.budget)) ||
            (step === 2 && (!formData.seatingType || !formData.workStyle || !formData.workStyleFlexibility)) ||
            (step === 3 && (!formData.workstations.count || Object.values(formData.meetingRooms).every(room => room.count === 0)))
          }
        >
          {step === 3 ? '설계 시작하기' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default InitialInfo; 