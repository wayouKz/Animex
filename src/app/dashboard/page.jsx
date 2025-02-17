'use client'
import { useState, useEffect, use } from "react";
import LoveCard from "../components/LoveCard";

const Page = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [session, setSession] = useState(null);
    const [love, setLove] = useState([]);
    const [favoriteAnime, setFavoriteAnime] = useState([]);

    console.log(love);
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                if (data?.user) {
                    setSession(data);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };

        fetchSession();
    }, []);

    useEffect(() => {
        const fetchLove = async () => {
            if (!session?.user?.id) return; 
            try {
                const res = await fetch(`/api/love/love-user?userID=${session.user.id}`);
                const data = await res.json();
                setLove(data.data || []);
            } catch (error) {
                console.error("Error fetching love data:", error);
            }
        };
        const fetchFavorite = async () => {
            if (!session?.user?.id) return;
            try{
                const res = await fetch(`/api/favorite/favorite-user?userID=${session.user.id}`);
                const data = await res.json();
                setFavoriteAnime(data.data || []);
            }catch(error){
                console.error("Error fetching favorite data:", error);
            }
        }
        if (session) {
            fetchLove();
            fetchFavorite();
        }
    }, [session] );


    return (
        <div className=" flex flex-col">
            <h1 className="text-2xl p-2 font-bold text-start text-[#f1f1f1]">Dashboard</h1>

            <div className="flex justify-center space-x-4 p-4">
                <button
                    className={`px-4 py-2 rounded-xl ${activeTab === "tab1" ? "bg-[#854836] text-white" : "bg-background/70 text-[#7c7c7c]"}`}
                    onClick={() => setActiveTab("tab1")}
                >
                    Like
                </button>
                <button
                    className={`px-4 py-2 rounded-xl ${activeTab === "tab2" ? "bg-[#854836] text-white" : "bg-background/70 text-[#7c7c7c]"}`}
                    onClick={() => setActiveTab("tab2")}
                >
                    Favorite
                </button>
            </div>

            {activeTab === "tab1" && (
                <div className="mx-20 rounded">
                    <div className="bg-[#543A14] rounded mb-10 overflow-y-scroll" style={{ height: "100vh"  }}>
                        <h1 className="text-2xl p-2 font-bold text-center text-[#f1f1f1]">Love</h1>
                        {love.length === 0 && (
                            <div className="p-2 text-center text-[#f1f1f1]">Kosong Brok</div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-start">
                            {love.map((love) => (
                                <LoveCard key={love.mal_id} mal_id={love.mal_id} title={love.title} image={love.image} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "tab2" && (
                <div className="mx-20 rounded flex-1" >
                       <div className="bg-[#543A14] rounded mb-10 overflow-y-scroll" style={{ height: "100vh"  }}>
                        <h1 className="text-2xl p-2 font-bold text-center text-[#f1f1f1]">Favorites</h1> {love.length === 0 && (
                            <div className="p-2 text-center text-[#f1f1f1]">Kosong Brok</div>
                        )}
                        <div className="flex flex-wrap gap-4 justify-start">
                            {favoriteAnime.map((fav) => (
                                <LoveCard key={fav.mal_id} mal_id={fav.mal_id} title={fav.title} image={fav.image} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
