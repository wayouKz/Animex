import Link from "next/link"
import Image from "next/image"
import Header from "../AnimeList/header"
const MangaList = ({ api }: { api: any }) => {
    return (
        <>
        
        <div className="grid  md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 p-3 px-4 " style={{ cursor: 'pointer' }}>
                      {api.data?.map((manga, index) => (
                        <Link href={`/details/manga/${manga.mal_id}`} key={index}>
                             <div className="= card bg-primary  w-full shadow rounded  flex flex-col items-start hover:text-color-primary hover:shadow-lg  " key={manga.mal_id}>
                                                       <figure className="relative w-full h-[350px]">
                                                           <Image className="w-full h-full object-cover rounded" src={manga.images.webp.image_url} alt={manga.images.jpg.image_url} width={350} height={350} />
                                                       </figure>
                                                       <h5 className="md:text-md text-sm p-2 font-bold text-white text-center" style={{color: 'white'}}>{manga.title}</h5>
                                           </div>
                        </Link>
                    ))}
                    </div>

        </>
    )
}

export default MangaList
