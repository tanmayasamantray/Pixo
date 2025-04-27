import { PostList } from "../components/PostList"

export const Home = () => {
  return(
    <div className="pt-8">
      <h2 className="text-5xl font-bold mb-6 text-center bg-gradient-to-r from-[#f88479] to-[#9713ff] bg-clip-text text-transparent">Recent Posts</h2>
      <div>
        <PostList />
      </div>
    </div>
  )
}