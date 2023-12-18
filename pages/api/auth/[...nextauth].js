import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import jwt from 'jsonwebtoken';

const BASE_URL = `${process.env.NEXT_PUBLIC_EDU_PROTOCOL}://${process.env.NEXT_PUBLIC_EDU_URL}:${process.env.NEXT_PUBLIC_EDU_PORT}/api`;
const LoginAuthorization = btoa(`Basic ${process.env.NEXT_PUBLIC_EDU_FRONT_ID} ${process.env.NEXT_PUBLIC_EDU_FRONT_CLIENT_SECRET}`)

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const { username, password } = credentials;
          const response = await axios.post(`${BASE_URL}/login/`, {
              username,
              password
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'LoginAuthorization': LoginAuthorization
              }
          })
          // console.log("------------------------------------")
          // console.log(response)
          // console.log("------------------------------------")

          const decode = jwt.decode(response.data.access_token)
          // console.log(response.data.access_token)
          // console.log(decode)
          return response.data

        } catch (e) {
          console.log('error!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          console.log(e)
          throw new Error('인증 실패');
        }
        
      }
    })
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(data) {
      // console.log('1111111111111111111111111')
      // console.log(data)
      const decode = jwt.decode(data.access_token)
      if (data) {
        // console.log('1111111111111111111111111')
        // console.log(data)
        // token.user = decode.preferred_username;
      }
      return data;
    },
    async session(session, token) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn:'/'
  }
}
export default NextAuth(authOptions)