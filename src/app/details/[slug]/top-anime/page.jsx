'use client'
import AnimeList from "@/app/components/AnimeList";
import Headers from "../../../components/Utilities/Headers";
import Pagination from "@app/components/Utilities/Pagination";
import Loading from "@app/components/Utilities/Loading";
import React, { useState, useEffect } from "react";

const details = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${page}`);
      const data = await response.json();
      setTopAnime(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="h-screen">
      <div className="p-3 " >
        <Headers title="Top Anime" page={page} />
        {loading ? (
          <Loading />
        ) : (
          <div className="p-3 px-4" style={{ maxHeight: "550px", overflowY: "auto" }}>
            <AnimeList api={topAnime} />
          </div>
        )}
      </div>
      {topAnime.pagination && (
        <Pagination page={page} setPage={topAnime.pagination.last_visible_page}  pageTerbaru={setPage}/>
      )}
    </div>
  );
};

export default details;
