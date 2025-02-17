"use client";
import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

const Favorite = ({ mal_id ,title,image}) => {
  const [isFav, setIsFav] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`);
        if (!response.ok) throw new Error("Failed to fetch session");

        const user = await response.json();
        setSession(user);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    if (session?.user?.id) {
      const fetchFavorite = async () => {
        try {
          const res = await fetch(`/api/favorite?userID=${session.user.id}&mal_id=${mal_id}`);
          if (!res.ok) throw new Error("Failed to fetch favorite");

          const data = await res.json();
          const isFavorite = data?.data?.some((fav) => fav.mal_id === mal_id);
          setIsFav(isFavorite);
        } catch (error) {
          console.error("Error fetching favorite:", error);
        }
      };
      fetchFavorite();
    }
  }, [session, mal_id]);

  const setFav = async () => {
    if (!session?.user?.id) {
      console.error("User ID is required to set a favorite.");
      return;
    }

    try {
      const res = await fetch("/api/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mal_id, userID: session.user.id ,title,image }),
      });

      if (!res.ok) throw new Error("Failed to set favorite");

      setIsFav((prev) => !prev);
    } catch (error) {
      console.error("Error setting favorite:", error);
    }
  };
  console.log(isFav)
  return (
    <div className="flex items-center justify-center">
      <button type="button" onClick={setFav}>
       {
        isFav ? (
          <Bookmark size={32} color="orange" fill="orange" />
        ) : (
          <Bookmark size={32} color="orange" />
        )
       }
        Favorite
      </button>
    </div>
  );
};

export default Favorite;

