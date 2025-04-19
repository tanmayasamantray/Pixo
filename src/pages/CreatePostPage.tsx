import { CreatePost } from "../components/CreatePost"

export const CreatePostPage = () => {
    return(
        <div className="flex flex-col items-center justify-center h-screen text-white">
            <h2>Create new Post</h2>
            <CreatePost />
        </div>
    )
}