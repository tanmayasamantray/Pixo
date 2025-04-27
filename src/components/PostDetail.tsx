import { useQuery } from "@tanstack/react-query";
import { Post } from "./PostList";
import { supabase } from "../supabase-client";

interface Props{
    postId: number;
}
const fetchPostById = async (id: number): Promise<Post> =>{
    const {data, error} = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

        if(error) throw new Error(error.message)
        
        return data as Post;
}
export const PostDetail = ({postId}: Props) => {
    const {data, error, isLoading} = useQuery<Post, Error>
    ({queryKey: ["posts",postId], 
    queryFn: () => fetchPostById(postId)});

    if(isLoading) {return <div>Loading posts...</div>}

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div className="space-y-6">
            <h2 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-[#f88479] to-[#9713ff] bg-clip-text text-transparent">{data?.title}</h2>
            <img src={data?.image_url} alt={data?.title} className="mt-4 rounded object-cover px-50 w-full h-64" />
            <p className="text-gray-400 px-50">{data?.content}</p>
            <p className="text-gray-500 px-50 text-sm">Posted on: {new Date(data!.created_at).toLocaleDateString()}</p>
        </div>
    )
}