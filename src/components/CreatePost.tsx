import { useMutation } from "@tanstack/react-query"
import { FormEvent, useState } from "react"
import { supabase } from "../supabase-client"

interface PostInput {
    title: string
    content: string
}

const createPost = async (post: PostInput) =>{
    const {data, error} = await supabase.from("posts").insert([post])

    if(error) throw new Error(error.message);

    return data;
}

export const CreatePost = () =>{
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const {mutate} = useMutation({mutationFn: createPost })

    const handleSubmit = (event: FormEvent) =>{
        event.preventDefault();
        mutate({title, content})
    }
    const handleFileChange = async() =>{
        
    }
    return(
        <form onSubmit={handleSubmit} className="text-white" >
            {" "}
            <div>
                {" "}
                <label>Title</label>
                <input
                className="border-1 border-white m-3" type="text"
                id="title"
                required 
                onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                {" "}
                <label>Content</label>
                <textarea
                className="border-1 border-white m-3"
                id="content"
                rows={5}
                required
                onChange={(event) => setContent(event.target.value)}
                />
            </div>
            <div>
                {" "}
                <label>Upload Image</label>
                <input
                className="border-1 border-white m-3" 
                type="file"
                id="image"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                />
            </div>
            <button type="submit" className="bg-[#F88379] px-5 py-3 rounded-2xl cursor-pointer hover:bg-[#6e54a4]">Create Post</button>
        </form>
    )
}