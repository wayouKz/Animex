import Header from "../../components/AnimeList/header";
import AnimeList from "../../components/AnimeList";
import Loading from "../../components/Utilities/Loading";

const Page = async ({ params } : any) => {
    const keyWord = params.keyword;
    console.log(params);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyWord}`);
        const data = await res.json();
        const animeData = data.data;
        return (
            <>
                <section>
                    <Header title={`Results for ${keyWord}`} linkHref="/details/top" linkTitle="" />
                    <AnimeList url={'anime'} api={{ data: animeData }} />
                </section>
            </>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return <Loading />;
    }
};

export default Page;
