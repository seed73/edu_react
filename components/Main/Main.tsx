"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};

import React, { useState, useEffect, ReactNode } from 'react';
import { useSession } from "next-auth/react";
// import getSelfInfo from "@/api/auth"

import ModalComponent from "../Modal/ModalComponent";

// Modal.setAppElement('#root');



const Main = () => {

  const { data: session, status, update } = useSession(); // Use the useSession hook
  const [name, setName] = useState('김사원1');
  const [position, setPosition] = useState('센세센세');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const infoChangeClick = async () => {
    try {
      console.log(session)
      openModal();
    } catch (error) {

    }
  }

  const closeButtonBottomCenterStyle = {
    position: 'absolute', // 위치를 모달 내부의 상대적 위치로 지정
    bottom: '20px', // 하단에서 20px 떨어진 위치
    left: '50%', // 좌측에서 50% 떨어진 위치에 배치하여 중앙 정렬 효과
    transform: 'translateX(-50%)', // X축 기준으로 -50% 이동하여 정확한 중앙 정렬
    padding: '10px 20px', // 패딩 추가
    backgroundColor: '#f0f0f0', // 배경색 지정
    border: 'none', // 테두리 제거
    borderRadius: '5px', // 버튼 모서리 둥글게 처리
    cursor: 'pointer', // 마우스 오버 시 커서 변경
  };


  useEffect(() => {
    // console.log(session)

    setPosition((session?.user as any).position)
    setName((session?.user as any).name)
    
  }, [session]);

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3 overflow-hidden">
            <div className="relative drop-shadow-2">
              <Image
                src={"/images/user/no_profile.webp"}
                width={160}
                height={160}
                alt="profile"
                className="rounded-full object-cover"
              />              
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {name}
            </h3>
            <p className="font-medium">{position}</p>
            <div className="flex justify-center items-center">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white h-12 w-50 mt-30"
              onClick={infoChangeClick}
            >정보변경</label>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Modal">
        {/* 모달 컨텐츠 */}
        <h2>모달 내용</h2>
        <button onClick={closeModal} className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-primary text-sm font-medium text-white px-4 py-2 rounded cursor-pointer">닫기</button>
      </ModalComponent>
    </>
  );
};

export default Main;
