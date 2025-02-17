"use client";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, url,  }: { api: any; url: string; }) => {
    console.log(api);

    return (
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 p-3 px-4" style={{ cursor: "pointer" }}>
            {api?.data?.map((anime: any, index: number) => (
                <Link href={`/details/anime/${anime.mal_id}`} key={index}>
                        <div className="card bg-[#543A14] w-full shadow rounded flex flex-col items-start hover:text-color-primary hover:shadow-lg">
                            <figure className="relative w-full h-[350px]">
                                <Image
                                    className="w-full h-full object-cover rounded"
                                    src={anime.images.webp.image_url}
                                    alt={anime.title}
                                    width={350}
                                    height={350}
                                    />
                            </figure>
                            <h5 className="md:text-md text-sm p-2 font-bold text-white text-center text-foreground">
                                {anime.title}
                            </h5>
                        </div>
                    </Link>   
            ))}
        
        </div>
    );
};

export default AnimeList;
