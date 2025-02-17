'use client'
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
// import {authSession} from "../lib/auth"
const Pages = () => {
    const [session, setSession] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchData = async () => {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setSession(data);
    }
    
    useEffect(() => {
        fetchData();
    }, []);

    if (session?.user) {
        redirect('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const formData = new FormData(e.target);
        const res = await signIn('credentials', {
            redirect: false,
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: 'http://localhost:3000/',
        });
        if(res.ok) {
            setErrorMessage("Login Sukses");
            setIsLoading(false);
            redirect('/');
        }
        console.log(res);

        if (res.status === 401) {
            setErrorMessage("Password Salah!");
            setIsLoading(false);
            return;
        }

    };
    const handleGithubSignIn = async () => {
        setIsLoading(true);
        const res = await signIn('github', {
            redirect: false,
            callbackUrl: 'http://localhost:3000/',
        });
        console.log(res);
        if (res?.status === 403) {
            setErrorMessage("Email sudah terdaftar di Github");
            setIsLoading(false);
            return;
        }

    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const res = await signIn('google', {
            redirect: false,
            callbackUrl: 'http://localhost:3000/',
        });
        if (res?.status === 403) {
            setErrorMessage("Email sudah terdaftar di Google");
            setIsLoading(false);
            return;
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-md bg-[#543A14]  rounded p-6 space-y-6 ">
                <div>
                    <h1 className="text-2xl font-bold text-center text-[#FFF0DC] ">Login</h1>
                    {errorMessage && <p className="text-[#ff0d0d] text-center">{errorMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input type="email" className="px-3 w-full bg-[#FFF0DC]  text-[#000] rounded-lg p-2 shadow-lg" name="email" id="email" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium" >Password</label>
                                <input type="password" className="px-3 w-full bg-[#FFF0DC] text-[#000]  rounded-lg p-2 shadow-lg" name="password" id="password" required />
                            </div>
                            <button type="submit" className="px-4 text-white bg-blue-500 rounded w-full py-2 bg-[#FFF0DC]" disabled={isLoading}>
                        {isLoading ? <h1 className="text-[#000]">Signing in...</h1> : <h1 className="text-[#000]">Login</h1>}
                              
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex justify-between items-center">
                    <h1 className="text-sm">Belum Punya Akun?</h1>
                    <Link href="/login/register" className="text-sm">Register</Link>
                </div>
                <button type="button" onClick={handleGithubSignIn}
                    className="py-2 px-4 w-full flex justify-center items-center bg-[#FFF0DC] hover:bg-gray-700 focus:ring-gray-500 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  className="mr-2 " viewBox="0 0 1792 1792">
                        <path d="M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z"></path>
                    </svg>
                    {isLoading ? <h1 className="text-[#000]">Signing in...</h1> : <h1 className="text-[#000]">Sign in with Github</h1>}
                   
                </button>
                <button type="button" onClick={handleGoogleSignIn}
                    className="py-2 px-4 w-full flex justify-center items-center bg-[#FFF0DC] hover:bg-gray-700 focus:ring-gray-500 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" className="mr-2 " viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
                    {isLoading ? <h1 className="text-[#000]">Signing in...</h1> : <h1 className="text-[#000]">Sign in with Google</h1>}
                </button>
            </div>
        </div>
    );
};

export default Pages;
