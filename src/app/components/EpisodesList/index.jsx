'use client'
import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
const EpisodesList = ({ params }) => {
    const [api, setApi] = useState([]);
    const [page, setPage] = useState(1);

    const fetching = async () => {
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime/${params}/videos/episodes?page=${page}`);
            if (!res.ok) throw new Error("Failed to fetch episodes");
            const videoData = await res.json();
            setApi(videoData);
    
    };

    const PageSebelum = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const PageSelanjut = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        fetching();
    }, [page]);
    return(
        <>
                 <div className="mt-2 my-5 justify-start p-5 mx-6 rounded-lg bg-[#543A14] shadow-lg overflow-auto max-h-[500px]">
            <h1 className="font-bold text-xl mb-2 text-center uppercase">Episodes</h1>
            {api?.data?.map((episode, index) => (
                <div className="bg-[#9a6c1e] mx-2 shadow rounded mt-2" key={index}>
                    {/* <Link href={`/details/anime/${episode.anime_id}/${episode.episode_id}`}> */}
                    <Link href={episode.url}>
                        <div className="flex items-center">
                            <Image src={episode.images?.jpg.image_url} width={100} height={100} alt="image" className="rounded object-cover" />
                            <p className="text-sm">{episode.episode}</p>
                            <p className="md:text-md text-sm p-2">{episode.title}</p>
                        </div>
                    </Link>
                </div>
            ))}
            <div className="flex items-center justify-center my-4 gap-2">
                {page > 1 && (
                    <button className="bg-[#854836] text-white px-4 py-2 rounded-full hover:bg-[#7c3a15] transition duration-300 shadow-md" onClick={PageSebelum}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
                <p>{page}/{api?.pagination?.last_visible_page}</p>
                {page < api?.pagination?.last_visible_page && (
                    <button className="bg-[#854836] text-white px-4 py-2 rounded-full hover:bg-[#7c3a15] transition duration-300 shadow-md" onClick={PageSelanjut}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
        </>
        )
}

export default EpisodesList