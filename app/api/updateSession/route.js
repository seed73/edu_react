import axios from 'axios';
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import { authOptions } from "pages/api/auth/[...nextauth]"
import { getToken } from 'next-auth/jwt';
getSession

const BASE_URL = `${process.env.NEXT_PUBLIC_EDU_PROTOCOL}://${process.env.NEXT_PUBLIC_EDU_URL}:${process.env.NEXT_PUBLIC_EDU_PORT}/api`;

export async function POST(req, res) {
  const session = await getServerSession(authOptions)
  if (session) {
    const response = await axios.get(`${BASE_URL}/account/by-user-id/${session.user.user_id}/`);
    return new Response(JSON.stringify({ success: true, additionalData: response.data }), {status: 200});
  }
  return new Response(JSON.stringify({ error: 'Unauthorized' }), {status: 401});
}


// const getSession = async () => {
  
// };