"use client"

import React, { useState, useContext, useEffect } from 'react';
import Image from "next/image";
import { signIn, useSession } from 'next-auth/react'
import AlertModal from "../../../components/Alert/AlertModal";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { data: session, status } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isFormValid = id && password; // 폼이 유효한지 여부를 결정하는 논리

  const router = useRouter();
  
  // const { setIsAuth } = useContext(AuthContext); 

  useEffect(() => {
    // 로그인 상태 확인
    if (status === "authenticated") {
      // 이미 로그인 되어 있으면 원하는 경로로 리디렉션
      router.replace('/'); // 또는 다른 페이지
    }
  }, [status, router]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return; // 폼이 유효하지 않으면 함수를 더 이상 진행하지 않음

    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl:'/',
      username: id,
      password: password
    });

    if (result.error) {
      // 로그인 실패 시 에러 메시지를 상태에 설정
      setErrorMessage('아이디 혹은 비밀번호가 일치하지 않습니다.');
      setShowAlert(true);
    } else {      
      router.replace(result.url || '/');
    }
  };

  if(status == "authenticated")
  return (
    <div></div>
  )

  return (
    <div className='login-page pageWrapper d-lg-flex'>
      <Image
        width={926}
        height={180}
        src={"/images/logo/eduplex_logo.webp"}
        alt="Logo"
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="login-input"
            placeholder='id'
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder='password'
            type='password'
          />
        </div>
        <div className="login-button-container">
          <button
            type="submit"
            disabled={!isFormValid} // 버튼의 disabled 상태를 동적으로 설정
            className={`${!isFormValid ? 'login-button-disabled' : 'login-button'}`}
          >
            LOGIN
          </button>
        </div>
      </form>
      <p className="find-password">
        find password
      </p>
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        message={errorMessage}
        width="1/5" // 예시: 전체 너비의 2/3
        height="1/4" // 예시: 전체 높이의 1/4
      />
    </div>
  );
}