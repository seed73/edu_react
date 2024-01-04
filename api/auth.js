// import axios from 'axios';
// import Cookie from 'js-cookie';
// import { getSession } from 'next-auth/react';

// const BASE_URL = `${process.env.NEXT_PUBLIC_EDU_PROTOCOL}://${process.env.NEXT_PUBLIC_EDU_URL}:${process.env.NEXT_PUBLIC_EDU_PORT}/api`;
// const LoginAuthorization = btoa(`Basic ${process.env.NEXT_PUBLIC_EDU_FRONT_ID} ${process.env.NEXT_PUBLIC_EDU_FRONT_CLIENT_SECRET}`)

// const getSelfInfo = async (session) => {
//     try {
//         // const response = await axios.get(`${BASE_URL}/account/by-user-id/${session.user.user_id}/`);
//         axios.post('/api/updateSession')
//         if (response.status === 200){
//             response.error = false;
//             console.log(response)
//         }
//         return response; // 여기서는 응답 데이터를 반환합니다.
//     } catch (error) {
//         console.error('error', error);
//         return error.response;
//     }
// };


// export default getSelfInfo ;