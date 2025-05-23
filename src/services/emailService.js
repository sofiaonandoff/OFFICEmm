import emailjs from '@emailjs/browser';

// 이메일 전송 서비스
const EMAIL_SERVICE_ID = 'service_officemmphase2';
const EMAIL_TEMPLATE_ID = 'template_i0oey2n';
const EMAIL_USER_ID = 'YiZScPmNjcBDnC8nm';

const generateCSV = (formData) => {
  const rows = [
    ['구분', '항목', '내용'],
    ['기본 정보', '회사명', formData.companyName],
    ['', '담당자', formData.contactName],
    ['', '연락처', formData.contactPhone],
    ['', '공간 크기', `${formData.spaceSize}평`],
    ['', '총 인원', `${formData.totalEmployees}명`],
    ['', '예산 범위', formData.budget],
    ['', '좌석제도', formData.seatingType === 'fixed' ? '고정좌석제' : '자율좌석제'],
    ['', '업무 형태', {
      'startup': '스타트업',
      'finance': '재무/금융',
      'tech': 'IT/기술',
      'creative': '크리에이티브',
      'consulting': '컨설팅',
      'research': '연구/개발',
      'marketing': '마케팅',
      'general': '일반 사무'
    }[formData.workStyle]],
    ['', '업무 공간 유연성', {
      'high': '매우 유연',
      'medium': '중간',
      'low': '제한적'
    }[formData.workStyleFlexibility]],
    ['개인 업무공간', '워크스테이션', `${formData.workstations.count}개 (${formData.workstations.size}cm)`],
    ['', '개인 락커', `${formData.lockers.count}개`],
    ['', '1인 포커스룸', `${formData.focusRooms.single.count}개`],
    ['', '2인 포커스룸', `${formData.focusRooms.double.count}개`],
    ['', '임원실(사무실)', `${formData.executiveRooms.count}개`],
    ['회의실', '소형 회의실(4인)', `${formData.meetingRooms.small.count}개`],
    ['', '중형 회의실(6인)', `${formData.meetingRooms.medium.count}개`],
    ['', '대형 회의실(8인)', `${formData.meetingRooms.large.count}개`],
    ['', '컨퍼런스룸(9인 이상)', `${formData.meetingRooms.conference.count}개`]
  ];

  // 추가 공간 정보 추가
  Object.entries(formData.additionalSpaces).forEach(([type, space]) => {
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

export const sendOfficeDataEmail = async (formData) => {
  try {
    // CSV 내용 생성
    const csvContent = generateCSV(formData);

    const templateParams = {
      company_name: formData.companyName,
      contact_name: formData.contactName,
      contact_phone: formData.contactPhone,
      office_size: `${formData.spaceSize}평`,
      employee_count: `${formData.totalEmployees}명`,
      office_budget: formData.budget,
      seating_type: formData.seatingType === 'fixed' ? '고정좌석제' : '자율좌석제',
      work_style: {
        'startup': '스타트업',
        'finance': '재무/금융',
        'tech': 'IT/기술',
        'creative': '크리에이티브',
        'consulting': '컨설팅',
        'research': '연구/개발',
        'marketing': '마케팅',
        'general': '일반 사무'
      }[formData.workStyle],
      work_style_flexibility: {
        'high': '매우 유연',
        'medium': '중간',
        'low': '제한적'
      }[formData.workStyleFlexibility],
      workstations: `${formData.workstations.count}개 (${formData.workstations.size}cm)`,
      lockers: `${formData.lockers.count}개`,
      focus_rooms_single: `${formData.focusRooms.single.count}개`,
      focus_rooms_double: `${formData.focusRooms.double.count}개`,
      executive_rooms: `${formData.executiveRooms.count}개`,
      meeting_rooms_small: `${formData.meetingRooms.small.count}개`,
      meeting_rooms_medium: `${formData.meetingRooms.medium.count}개`,
      meeting_rooms_large: `${formData.meetingRooms.large.count}개`,
      meeting_rooms_conference: `${formData.meetingRooms.conference.count}개`,
      additional_spaces: Object.entries(formData.additionalSpaces)
        .filter(([_, space]) => space.required)
        .map(([type, space]) => {
          const spaceName = {
            'canteen': '캔틴',
            'lounge': '라운지',
            'breakRoom': '휴게실',
            'storage': '창고',
            'exhibition': '전시공간',
            'serverRoom': '서버실',
            'other': '기타'
          }[type];
          return `${spaceName}${space.size ? ` (${space.size})` : ''}`;
        })
        .join('\n'),
      csv_content: csvContent
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams,
      EMAIL_USER_ID
    );

    if (response.text !== 'OK') {
      throw new Error('이메일 전송에 실패했습니다.');
    }

    return true;
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    throw new Error(error.message || '이메일 전송 중 오류가 발생했습니다.');
  }
};

const formatEmailContent = (data) => {
  const workStyleMap = {
    'startup': '스타트업',
    'finance': '재무/금융',
    'tech': 'IT/기술',
    'creative': '크리에이티브',
    'consulting': '컨설팅',
    'research': '연구/개발',
    'marketing': '마케팅',
    'general': '일반 사무'
  };

  const flexibilityMap = {
    'high': '매우 유연',
    'medium': '중간',
    'low': '제한적'
  };

  const additionalSpaces = Object.entries(data.additionalSpaces)
    .filter(([_, space]) => space.required)
    .map(([type, space]) => {
      const spaceName = {
        'canteen': '캔틴',
        'lounge': '라운지',
        'breakRoom': '휴게실',
        'storage': '창고',
        'exhibition': '전시공간',
        'serverRoom': '서버실',
        'other': '기타'
      }[type];
      return `${spaceName}${space.size ? ` (${space.size})` : ''}`;
    })
    .join('\n');

  return `
[기본 정보]
회사명: ${data.companyName}
담당자: ${data.contactName}
연락처: ${data.contactPhone}
공간 크기: ${data.spaceSize}평
총 인원: ${data.totalEmployees}명
예산 범위: ${data.budget}
좌석제도: ${data.seatingType === 'fixed' ? '고정좌석제' : '자율좌석제'}
업무 형태: ${workStyleMap[data.workStyle]}
업무 공간 유연성: ${flexibilityMap[data.workStyleFlexibility]}

[개인 업무공간]
워크스테이션: ${data.workstations.count}개 (${data.workstations.size}cm)
개인 락커: ${data.lockers.count}개
1인 포커스룸: ${data.focusRooms.single.count}개
2인 포커스룸: ${data.focusRooms.double.count}개
임원실(사무실): ${data.executiveRooms.count}개

[회의실]
소형 회의실(4인): ${data.meetingRooms.small.count}개
중형 회의실(6인): ${data.meetingRooms.medium.count}개
대형 회의실(8인): ${data.meetingRooms.large.count}개
컨퍼런스룸(9인 이상): ${data.meetingRooms.conference.count}개

[추가 공간]
${additionalSpaces}
`;
}; 