import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
 const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                console.log("Authorize function called:", credentials.email);

                try {
                    // const res = await fetch("http://localhost:3000/api/auth/login", {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                            provider: "local"
                        }),
                    });

                 if (res.status === 404) {
                    return null;
                 }
                 if(res.ok) {
                    const user = await res.json();
                    return user || null;
                 }
                   
                } catch (error) {
                    console.error("Login error:", error);
                    throw new Error("Something went wrong");
                }
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT,
            clientSecret: process.env.GITHUB_SECRET_KEY,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_SECRET_CLIENT,
        }),
    ],

    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "github") {
                try {
                    const email = profile.email ?? `${profile.id}@github.com`;

                    // const res = await fetch("http://localhost:3000/api/auth/github-login", {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/github-login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            githubId: profile.id,
                            email: email,
                            name: profile.login,
                            image: profile.avatar_url,
                            provider: "github"
                        }),
                    });

                    if (!res.ok) {
                        console.error("GitHub login failed:", await res.text());
                        return false;
                    }else if(res.status === 400){
                        JSON.parse(await res.text()).error
                    }

                    return true;
                } catch (error) {
                    console.error("GitHub sign-in error:", error);
                    return false;
                }
            }else if (account.provider === "google") {
                console.log(profile);
                try {
                    const email = profile.email ?? `${profile.sub}@google.com`;
                    // const res = await fetch("http://localhost:3000/api/auth/github-login", {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/github-login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            githubId: profile.sub,
                            email: email,
                            name: profile.name,
                            image: profile.picture,
                            provider: "google"
                        })
                    });
                    if (!res.ok) {
                        console.error("Google login failed:", await res.text());
                        return false;
                    }else if(res.status === 400){
                        JSON.parse(await res.text()).error
                    }
                    const user = await res.json();

                    return user;
            }catch (error) {
                console.error("Google sign-in error:", error);
                return false;
            }
        }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // Gunakan JWT untuk sesi tanpa penyimpanan server
        maxAge: 60 * 60, // Session akan berakhir dalam 1 jam (3600 detik)
        updateAge: 5 * 60, // Perbarui token setiap 5 menit jika digunakan
      },
      jwt: {
          secret: process.env.NEXTAUTH_SECRET
      },
    pages: { signIn: "/login" },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

 const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
