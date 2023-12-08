import React, { useContext } from 'react';
import LoginPage from "./auth/login/LoginPage";
import FullLayout from "./full_layout";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  if(true){

    return(
      <LoginPage></LoginPage>
    )

  } else {
    return (<FullLayout>{children}</FullLayout>)
  }
}
