"use client";
import Header from "./components/AnimeList/header";
import AnimeList from "./components/AnimeList";
import Loading from "./components/Utilities/Loading";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [data, setData] = useState({
    TopAnime: [],
    Anime: [],

  });
  const [session, setSession] = useState([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const Session = async () => {
    //   try {
    //     const res = await fetch('/api/auth/session');
    //     const data = await res.json();
    //     setSession(data);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // }
    const fetchData = async () => {
      try {
        setLoading(true);
        const urls = {
          TopAnime: "top/anime?limit=5",
          Anime: "anime",
        };

        const responses = await Promise.all(
          Object.values(urls).map((url) =>
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`).then((res) =>
              res.json()
            )
          )
        );

        setData({
          TopAnime: responses[0],
          Anime: responses[1],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Session();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="bg-background">
      <section className="p-2">
        <Header
          title="Top Anime"
          linkHref="/details/anime/top-anime"
          linkTitle="See All Top Anime"
        />
        <AnimeList api={data.TopAnime} url="anime"  />
      </section>
      <section className="p-2">
        <Header
          title="Anime"
          linkHref="/details/anime"
          linkTitle="See All Anime"
        />
          <AnimeList api={data.Anime} url="anime" />
      </section>
    </div>
  );
};

export default Page;
