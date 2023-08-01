import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

import jwt from 'jsonwebtoken';

const SignToken = async (email)=> {
    const token = await jwt.sign({id:email}, process.env.NEXTAUTH_SECRET, {expiresIn: '1d'});
    return token
}

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorizationUrl:
                'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
            scope:
                'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly',
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                token.accessToken = await SignToken(user?.email);
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});