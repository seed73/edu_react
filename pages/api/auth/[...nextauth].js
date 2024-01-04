import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios';
import jwt from 'jsonwebtoken';
// import getSelfInfo from '@/api/auth'
import getSelfInfo from "@/api/auth"

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
      if (data.user) {

        const decode = jwt.decode(data.user.access_token)

        data.token.access_token = data.user.access_token
        data.token.user_id = decode.preferred_username
      }
      return data.token;
    },
    async session({session, token}) {
      if (token?.access_token) { // Ensure access_token exists
        session.user = {...session.user, access_token: token.access_token, user_id : token.user_id};
      }
      return session;
    },
  },
}
export default NextAuth(authOptions)