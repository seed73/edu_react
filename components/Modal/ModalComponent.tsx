// ModalComponent.tsx
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('div');

interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  contentLabel: string;
  children: React.ReactNode;
}

const closeButtonStyle = {
  position: 'absolute', // 버튼을 모달의 상대적 위치에 고정
  top: '10px', // 상단에서부터의 거리
  right: '10px', // 우측에서부터의 거리
  background: 'transparent', // 배경색 투명
  border: 'none', // 테두리 없음
  fontSize: '1.5rem', // 글자 크기
  cursor: 'pointer' // 마우스 오버 시 커서 변경
};

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
          zIndex: 9001, // z-index 값 조정
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
      <button onClick={onRequestClose} style={closeButtonStyle}>&#x2715;</button>
    </Modal>
  );
};

export default ModalComponent;