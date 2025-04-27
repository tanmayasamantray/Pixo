import { CreatePost } from "../components/CreatePost"

export const CreatePostPage = () => {
    return(
        <div className="pt-15">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-[#f88479] to-[#9713FF] bg-clip-text text-transparent">Create new Post</h2>
            <CreatePost />
        </div>
    )
}