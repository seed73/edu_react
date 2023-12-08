"use client"

// import React, { useState, useContext  } from 'react';
import Image from "next/image";
// import { login } from '../../../api/auth'
// import { AuthContext } from '../../../contexts/AuthContext';
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  // const [id, setId] = useState('');
  // const [password, setPassword] = useState('');
  // const { setIsAuth } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await signIn('credentials', {
    //   redirect: false, // 페이지 리디렉션을 방지
    //   username: id,
    //   password: password
    // });

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    console.log(username)
    console.log(password)

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password
    });

    console.log(res)
    
    if(res.status === 200){
      // setIsAuth(true)
    }
  };

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
          {/* <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="login-input"
            placeholder='id'
          /> */}
        </div>
        <div>
          {/* <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder='password'
            type='password'
          /> */}
        </div>
        <input name="username" type="text" placeholder="Username" />
      <input name="password" type="password" placeholder="44" />
        <div className="login-button-container">
          <button type="submit" className="login-button">
            LOGIN
          </button>
        </div>
      </form>
      <p className="find-password">
        find password
      </p>
    </div>
  );
}