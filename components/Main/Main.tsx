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
import { getSession } from 'next-auth/react';
import axios from 'axios';

const Main = () => {

  const { data: session, status, update } = useSession(); // Use the useSession hook
  const [name, setName] = useState('김사원1');
  const [position, setPosition] = useState('센세센세');

  const infoChangeClick = async () => {
    try {
      console.log(session)
      // setModalOpen(true)
    } catch (error) {

    }
  }

  useEffect(() => {
    // console.log(session)

    setPosition((session?.user as any).position)
    setName((session?.user as any).name)
    
  }, [session]);

  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };




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
      {/* <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <p>This is modal content!</p>
      </Modal> */}
    </>
  );
};

export default Main;
