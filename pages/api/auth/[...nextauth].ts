import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAuth } from "firebase/auth";
import app from "@/app/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);
export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
          .then(userCredential => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch(error => (console.log(error)))
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
      }
    })
  ],
}

export default NextAuth(authOptions);