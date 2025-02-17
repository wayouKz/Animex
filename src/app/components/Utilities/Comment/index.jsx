'use client'
import { Avatar, AvatarIcon } from "@heroui/react";
import {useState, useEffect} from "react"
const Comment = ({params}) => {
    const [comment, setComment] = useState([]);
    const [session, setSession] = useState([]);
    console.log(comment)
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`);
                const data = await res.json();
                setSession(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchSession();
        // fetchComment();

    },[])
    useEffect(() => {
        const fetchComment = async () => {
            if (!session?.user?.id) return;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment?mal_id=${params}`);
                const comments = await res.json();
                setComment(comments);
            } catch (error) {
                console.error("Error fetching comment:", error);
            }
        };
        fetchComment();

    }, [session?.user?.id, params]);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment: data.get('comment'),
                userID: session.user.id,
                mal_id: params
            })
        });

        const json = await res.json();
        if (json.message === "Comment added successfully") {
            e.target.reset();
            const res = await fetch(`/api/comment?mal_id=${params}`);
            const comments = await res.json();
            setComment(comments);
        }
    };
    return (  
        <div className="mt-2 my-5 justify-start p-5 mx-6 rounded-lg bg-[#543A14] shadow-lg overflow-auto max-h-[500px]">
            <h1 className="font-bold text-xl mb-2 text-center uppercase">Komentar</h1>
                <form onSubmit={HandleSubmit}>
                    <div className=" w-full p-2 bg-[#9a6c1e] rounded flex items-center gap-2">
                        <input type="text" placeholder="Komentar" className="w-full p-2 bg-[#9a6c1e] rounded" name="comment" autoComplete="off"/>
                        <button type="submit" className="bg-[#854836] text-white px-4 py-2 rounded-full hover:bg-[#7c3a15] transition duration-300 shadow-md flex items-center">     
                            Send
                        </button>
                    </div>
                </form>
                <div className="space-y-4">
  {comment.data?.length > 0 ? (
    comment.data.map((comentar) =>
        comentar.comment && comentar.comment.length > 0  ? (
        comentar.comment.map((komen, idx) => (
          <div
            className="flex border border-[#9a6c1e] p-2 shadow rounded mt-2 gap-3"
            key={`${comentar.id}-${idx}`}
          >
            <div className="flex m-2">
              <Avatar className="w-12 h-12" src={comentar.image} alt={comentar.name} />
            </div>
            <div className="flex flex-col">
                <i className="text-xs">{new Date(komen.date_time).toLocaleString()}</i>
              <h1 className="font-bold">{comentar.name}</h1>
                <i className="text-xs border-b">{comentar.email}</i>

              <p className="text-justify md:text-md font-bold my-3">{komen.comment}</p>
            </div>
          </div>
        ))
      ) : (
       null
      )
    )
  ) : (
    <h1 className="font-bold flex justify-center mt-52">Belum Ada Komentar</h1>
  )}
</div>
</div>

    )
}

export default Comment;