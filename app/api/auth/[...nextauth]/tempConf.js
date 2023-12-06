import KeycloakProvider  from 'next-auth/providers/keycloak';
import axios from 'axios';

// 필요한 환경 변수들
const BASE_URL = `${process.env.NEXT_PUBLIC_EDU_PROTOCOL}://${process.env.NEXTAUTH_URL}:${process.env.NEXT_PUBLIC_EDU_PORT}/api`;
const LoginAuthorization = btoa(`Basic ${process.env.NEXT_PUBLIC_EDU_FRONT_ID} ${process.env.NEXTAUTH_SECRET}`)

export const nextAuthConfig = {
  providers: [
    KeycloakProvider ({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {  label: "Password",  type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        try {

            console.log('aaaaaaaaaaaaa')

          const { username, password } = credentials;
          // 인증 서버에 요청
          const response = await axios.post(`${BASE_URL}/login/`, {
              username,
              password
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'LoginAuthorization': LoginAuthorization
              }
          });
          const user = { jwt: response.data.access_token, name: username };
          return user;
        } catch (e) {
          throw new Error('인증 실패');
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.jwt = user.jwt;
      }
      return token;
    },
    async session(session, token) {
      session.jwt = token.jwt;
      return session;
    },
  },
};