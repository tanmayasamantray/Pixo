import { useMutation } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { supabase } from "../supabase-client"
import { useAuth } from "../context/AuthContext"

interface PostInput {
    title: string
    content: string
    avatar_url: string | null
}

const createPost = async (post: PostInput, imageFile: File) =>{
    
    const filePath = `${post.title}-${Date.now()}-${imageFile.name}`
    const{error: uploadError} = await supabase.storage.from("post-images").upload(filePath, imageFile)
    if(uploadError) throw new Error(uploadError.message)
    
    const{data: publicURLData} = await supabase.storage.from("post-images").getPublicUrl(filePath)
    const {data, error} = await supabase.from("posts").insert({...post, image_url: publicURLData.publicUrl})
    if(error) throw new Error(error.message);

    return data;
}

export const CreatePost = () =>{
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const {user} = useAuth()

    const {mutate, isPending, isError} = useMutation({mutationFn: (data:{post: PostInput, imageFile: File}) =>{
        return createPost(data.post, data.imageFile)
    } })

    const handleSubmit = (event: FormEvent) =>{
        event.preventDefault();
        if(!selectedFile) return;
        mutate({post: {title, content, avatar_url: user?.user_metadata.avatar_url || null}, imageFile: selectedFile})
    }
    const handleFileChange = async(e: ChangeEvent<HTMLInputElement>) =>{
        if(e.target.files && e.target.files[0]){
            setSelectedFile(e.target.files[0])
        }
    }
    return(
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto my-5 space-y-4 bg-[#ffffff0f] text-white py-5 px-10 border-1 rounded-xl border-violet-900/50" >
            <div>
                <label htmlFor="title" className="block mb-2 font-medium">
                Title
                <input
                className="w-full border-1 border-[#f88479cd] bg-[#ffffff16] p-2 rounded" type="text"
                id="title"
                required 
                onChange={(event) => setTitle(event.target.value)}
                />
                </label>
            </div>
            <div>
                <label htmlFor="content" className="block mb-2 font-medium">
                    Content
                    <textarea
                    className="w-full border-1 border-[#f88479cd] bg-[#ffffff16] p-2 rounded"
                    id="content"
                    rows={5}
                    required
                    onChange={(event) => setContent(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="image" className="block mb-2 font-medium">Upload Image
                    <input
                    className="w-full border-1 border-[#f88479cd] bg-[#ffffff16] rounded my-1 px-1 py-1 text-gray-200" 
                    type="file"
                    id="image"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    />
                </label>
                
            </div>
            <button type="submit" className="bg-gradient-to-r from-[#f88479] to-[#9713FF] px-4 font-bold text-black py-2 rounded cursor-pointer">
                {isPending ? "Creating..." : "Create Post"}
            </button>
            {isError && <p className="text-red-500">Error creating post</p>}
        </form>
    )
}