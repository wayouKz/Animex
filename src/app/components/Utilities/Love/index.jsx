'use client'
import { Heart } from "lucide-react"
import {useState , useEffect, use} from "react"

const love = ({mal_id,title,image}) => {
    const [isLove, setIsLove] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const session = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        session();
    }, [])
    useEffect(() => {
    if(user?.user?.id){
        const fetchLove = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/love?userID=${user.user.id}&mal_id=${mal_id}`);
                if (!res.ok) throw new Error("Failed to fetch favorite");
                const data = await res.json();
                const isFavorite = data?.data?.some((fav) => fav.mal_id === mal_id);
                setIsLove(isFavorite);
            }catch(error){
                console.error("Error fetching love:", error);
            }
        };

        fetchLove();
    }
    }, [user, mal_id]);
    const handleLove = () => {
        try{
            const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/love`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userID: user.user.id,
                    mal_id:  mal_id,
                    title: title,
                    image: image
                 }),
            });
            // if (!res.ok) throw new Error("Failed to set favorite");
            setIsLove((prev) => !prev);
        }catch(error){
            console.error("Error setting love:", error);
        }
    };


    return (
        <>
        <div className="flex items-center justify-center gap-1">
            <button type="button" onClick={handleLove}>
                {isLove ? <Heart size={32} color="red" fill="red" /> : <Heart size={32} color="red" />}
                Love
            </button>
        </div>
        </>
    )
}

export default love