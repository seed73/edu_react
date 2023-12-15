import React, { useContext } from 'react';
import LoginPage from "./auth/login/LoginPage";
import FullLayout from "./full_layout";
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if(true){

    return(
      <SessionProviderWrapper>
        <LoginPage></LoginPage>
      </SessionProviderWrapper>
    )

  } else {
    return (<FullLayout>{children}</FullLayout>)
  }
}
