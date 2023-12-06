import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          console.log('aaaaaaaaaaaaa')

          const { username, password } = credentials;

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
})

export { handler as GET, handler as POST }


















/*

export const nextAuthConfig = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          try {
            console.log('aaaaaaaaaaaaa')

            const { username, password } = credentials;

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
        }
      })
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

*/