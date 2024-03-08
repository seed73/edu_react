import React, { useEffect, useState } from 'react';

interface ModalInfoChange {
  closeModal: () => void;
}

const UserInfoModalContent: React.FC<ModalInfoChange> = ({ closeModal }) => {

  const [userData, setUserData] = useState({
    // 초기 상태 예시
    name: '',
    email: '',
    // 기타 필요한 필드...
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // 여기에서 데이터를 요청하는 로직 구현
      // 예시 API 호출: const response = await fetch('/api/user');
      // const data = await response.json();
      
      // 임시 데이터로 상태 업데이트
      setUserData({
        name: '사용자 이름',
        email: 'user@example.com',
        // 기타 필드...
      });
    };

    // 모달이 열릴 때마다 사용자 데이터 요청
    fetchUserData();
  }, []); // 빈 배열을 의존성 목록으로 전달하여 컴포넌트 마운트 시 1회 실행

  // 입력 필드 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 데이터 수정 API 호출 로직 구현
    console.log('Updated data:', userData);
    closeModal();
  };

  // "수정" 버튼 클릭 시 실행될 함수
  const handleUpdate = async () => {
    try {
      // 여기에 데이터 수정을 위한 API 요청 로직 구현
      console.log('Updating user data...', userData);
      // API 요청 성공 가정
      closeModal(); // 요청이 성공하면 모달 닫기
    } catch (error) {
      console.error('Failed to update user data', error);
      // 에러 처리 로직 구현
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="p-4">
      <table className="w-full">
        <tbody>
          {/* 이름 필드 */}
          <tr>
            <td className="px-2 py-2 text-right">이름:</td>
            <td className="px-2 py-2">
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            </td>
          </tr>
          {/* 이메일 필드 */}
          <tr>
            <td className="px-2 py-2 text-right">이메일:</td>
            <td className="px-2 py-2">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              />
            </td>
          </tr>
          {/* 기타 필드 추가 가능 */}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <label
            htmlFor="cover"
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-primary text-sm font-medium text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleUpdate}
        >정보변경</label>
      </div>
    </form>
      
    </>
  );
};

export default UserInfoModalContent;