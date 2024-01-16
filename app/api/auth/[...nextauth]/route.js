import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { verifyPassword } from "../../../../helpers/authBcrypt";
import connectMongoDB from "@/helpers/mongodb";
import User from "@/models/userModel";

const handler = NextAuth({
    session: {
        jwt: true
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                try {
                    await connectMongoDB();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found...");
                    }

                    const isValid = await verifyPassword(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Password wrong...");
                    }

                    return {
                        name: user.name,
                        email: user.email,
                        image: user.photo
                    };
                } catch (error) {
                    throw new Error("Authentication failed");
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
});

export { handler as GET, handler as POST }
