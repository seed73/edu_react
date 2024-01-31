// ModalComponent.tsx
import React from 'react';
import Modal from 'react-modal';

// Modal.setAppElement('#root');

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onRequestClose,
  contentLabel,
  children
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.75)', // 투명한 백그라운드
          zIndex: 1000, // z-index 값 조정
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white', // 흰색 배경
          padding: '20px',
          borderRadius: '4px', // 모달의 둥근 모서리
          width: '50%', // 모달의 너비 설정
          height: '50%', // 모달의 높이 설정
          // 기타 스타일 설정
        },
      }}
    >
      {children}
      <button onClick={onRequestClose}>닫기</button> {/* Close 버튼 추가 */}
    </Modal>
  );
};

export default ModalComponent;