
'use client'
import Link from "next/link"
import { useState } from "react"
const page = () => {
    const[isLoading, setIsLoading] = useState(false);
    const[errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        try{
            setIsLoading(true);
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    confirmPassword: formData.get('confirmpassword'),
                    name: formData.get('name'),
                }),
            });
            if (res.ok) {
                setIsLoading(false);
                window.location.href = '/login';
            } else {
                setIsLoading(false);
                const errorData = await res.json();
                setErrorMessage(errorData.message);
            }
        } catch (error) {
        setIsLoading(false);
        console.error('Registration error:', error);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-[#543A14]  rounded p-6 space-y-6 ">
            <div>
                <h1 className="text-2xl font-bold text-center text-[#FFF0DC] ">Register</h1>
                {errorMessage && <p className="text-[#ff0000] text-center">{errorMessage}</p>}
                <form  onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#FFF0DC]">Name</label>
                            <input type="text" className={`px-3 w-full  bg-[#FFF0DC] text-[#000] rounded-lg p-2 shadow-lg ${errorMessage ? 'border-2 border-[#ff0000]' : ''}`}  name="name" id="name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#FFF0DC]">Email</label>
                            <input type="email" className={`px-3 w-full  bg-[#FFF0DC] text-[#000] rounded-lg p-2 shadow-lg ${errorMessage ? 'border-2 border-[#ff0000]' : ''}`}  name="email" id="email" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#FFF0DC]" >Password</label>
                            <input type="password" className={`px-3 w-full  bg-[#FFF0DC] text-[#000] rounded-lg p-2 shadow-lg ${errorMessage ? 'border-2 border-[#ff0000]' : ''}`}  name="password" id="password" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#FFF0DC]" >Confirm Password</label>
                            <input type="password" className={`px-3 w-full  bg-[#FFF0DC] text-[#000] rounded-lg p-2 shadow-lg ${errorMessage ? 'border-2 border-[#ff0000]' : ''}`} name="confirmpassword" id="confirmpassword" required />
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-sm">Sudah Punya Akun?</h1>
                            <Link href="/login" className="text-sm">Login</Link>
                        </div>
                        <button type="submit" className="px-4 text-white bg-blue-500 rounded w-full py-2 bg-[#FFF0DC]" >
                    {isLoading ? <h1 className="text-[#000]">Signing in...</h1> : <h1 className="text-[#000]">Login</h1>}
                          
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
export default page