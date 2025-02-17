import { notFound } from "next/navigation";

const page = ({ params }) => {
    return (
        <>
            {params.slug === "anime" ? (
                <>
                    
                </>
            ) : params.slug === "manga" ? (
                <>
                
                </>
            ) : (
                notFound()
            )}
        </>
    );
};

export default page;
