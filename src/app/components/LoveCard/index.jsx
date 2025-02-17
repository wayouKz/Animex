import Image from "next/image";
import Link from "next/link";
const LoveCard =    ({ mal_id, title, image }) => {
    console.log(image);
    return (
        
                <div className=" mx-2 bg-[#854836] rounded mb-2">
                    <Link href={`/details/anime/${mal_id}`}>   
                        <div className="flex flex-col items-center">
                            <Image src={image} width={250} height={150} alt={title} className="rounded object-cover" />
                            <h5 className="md:text-md text-sm p-2 font-bold text-white text-center">{title}</h5>
                        </div>
                    </Link>
                </div>
          
    );
};

export default LoveCard;