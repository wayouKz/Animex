"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
const Back = () => {
    const router = useRouter();
    return (
        <>
             <button
            className="px-2 py-2 rounded  hover:bg-blue-700 text-white mr-2 flex items-center"
            onClick={() => router.back()}
            aria-label="Go back"
        >
        <ArrowLeft size={32} color="white" />
        </button>
        </>
       
        
    );
}

export default Back