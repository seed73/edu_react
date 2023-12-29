"use client"

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile Page | Next.js E-commerce Dashboard Template",
  description: "This is Profile page for TailAdmin Next.js",
  // other metadata
};

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import getSelfInfo from "@/api/auth"

const Main = () => {

  const { data: session } = useSession();

  const infoChangeClick = async () => {
    if (session) {
      try {
        const data = await getSelfInfo(session);
        // setUserInfo(data); // 상태 업데이트
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No session found!");
    }
  }

  useEffect(() => {
    if (session) {
      // 세션에서 토큰을 가져와 API 함수에 전달
      getSelfInfo(session)
        .then((data: any) => {
          console.log(data)
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
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
              김사원
            </h3>
            <p className="font-medium">Ui/Ux Designer</p>
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
    </>
  );
};

export default Main;
