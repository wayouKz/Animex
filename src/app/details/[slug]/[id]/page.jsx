import Image from "next/image"
import Iframe from "@app/components/Utilities/Iframe"
import Back from "@app/components/Utilities/Back"
import Love from "@app/components/Utilities/Love"
import Favorite from "@app/components/Utilities/Favorite"
import Comment from "@app/components/Utilities/Comment"
import EpisodesList from "@app/components/EpisodesList"

const details = async ({ params }) => {
    const api = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${params.slug}/${params.id}`)
    const data = await api.json()

   
    return (
        <>
            <Back />
            <div className="lg:flex items-center justify-start gap-6 p-5 mx-6 bg-[#543A14] rounded">
                <div className="flex justify-center md:w-full ">
                    <Image src={data.data.images.webp.image_url} width={300} height={300} alt="image" className="rounded slide-in-from-right-72"  />
                </div>
                <div className="w-full">
                    <h1 className="font-bold text-xl mb-2 text-center uppercase my-5">{data.data.title}</h1>
                    <p className="text-gray-700 text-base text-justify">{data.data.synopsis}</p>
                    <div className="lg:flex items-center justify-start my-4 lg:gap-2">
                        <div className="sm:flex items-center justify-start my-4 gap-2">
                            <h1 className="font-bold text-base text-justify uppercase">Score :</h1> <p>{data.data.score}</p>
                        </div>
                        <div className="sm:flex items-center justify-start my-4 gap-2">
                            <h1 className="font-bold text-base text-justify uppercase">Status : </h1> <p>{data.data.status}</p>
                        </div>
                        <div className="sm:flex items-center justify-start my-4 gap-2">
                            <h1 className="font-bold text-base text-justify uppercase">Duration : </h1> <p>{data.data.duration}</p>
                        </div>
                        <div className="sm:flex items-center justify-start my-4 gap-2">
                            <h1 className="font-bold text-base text-justify uppercase">Type : </h1> <p>{data.data.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-start my-4 gap-3">
                        <Love mal_id={data.data.mal_id} title={data.data.title} image={data.data.images.webp.image_url} />
                        <Favorite mal_id={data.data.mal_id} title={data.data.title} image={data.data.images.webp.image_url} />
                    </div>
                </div>
            </div>
            {data.data.trailer?.embed_url && (
                <div className="bg-[#543A14] rounded-lg mx-4 md:mx-auto md:w-fit md:mt-5">
                    <h1 className="lg:hidden md:block font-bold text-base text-center uppercase mt-2 justify-end">Trailer</h1>
                    <div className="lg:flex sm:items-center sm:justify-center lg:fixed lg:bottom-1 lg:right-1 lg:justify-end ">
                    <Iframe url={data.data.trailer.embed_url} />
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <EpisodesList params={params.id}  />
              <Comment params={params.id}/>
            </div>
        </>
    )
}

export default details
