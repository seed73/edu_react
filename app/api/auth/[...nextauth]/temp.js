import { nextAuthConfig } from './tempConf';
import NextAuth from 'next-auth';

export async function POST(req, res) {
  return await NextAuth(req, res, nextAutnexhConfig);
}