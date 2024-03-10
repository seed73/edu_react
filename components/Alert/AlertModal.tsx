// AlertModal.tsx
import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  width?: string; // 예: '1/3', '1/2', 'full' 등 Tailwind CSS 클래스를 사용할 수 있도록 함
  height?: string; // 예: '1/4', '1/2', 'full' 등
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  message,
  width = '1/3', // 기본값 설정
  height = 'auto', // 기본값 설정
}) => {
  if (!isOpen) return null;

  const modalStyle = `bg-white p-8 rounded-lg shadow-lg text-center w-${width} h-${height}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* 모달 창 크기 조정 및 텍스트 가운데 정렬 추가 */}
      <div className={modalStyle}>
      {/* <div className="bg-white p-8 rounded-lg shadow-lg w-1/5 text-center"> */}
        <p>{message}</p>
        <button
            className="mt-4 bg-primary text-sm font-medium text-white px-4 py-2 rounded cursor-pointer"
            onClick={onClose}
        >확인</button>
      </div>
    </div>
  );
};

export default AlertModal;