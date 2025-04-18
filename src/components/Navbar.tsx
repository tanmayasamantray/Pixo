import { useState } from "react"
import { Link } from "react-router"

export const Navbar = () =>{
    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-40 bg-[] backdrop-blur-md shadow-md">
        <div className="max-w-[95%] mx-auto px-1">
            <div className="flex justify-between items-center">
                <Link to={"/"}><img src="/src/assets/Pixo.svg" width="80px" alt="Logo" /></Link>
                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-xl font-bold">
                  <Link className="text-gray-600 hover:text-[#00D1C1] transition-colors" to={"/"}>Home</Link>
                  <Link className="text-gray-600 hover:text-[#00D1C1] transition-colors" to={"/create"}>New Post</Link>
                  <Link className="text-gray-600 hover:text-[#00D1C1] transition-colors" to={"/communities"}>Communities</Link>
                  <Link className="text-gray-600 hover:text-[#00D1C1] transition-colors" to={"/community/create"}>New Community</Link>
                </div>
                {/* Mobile menu button */}
                <div className="md:hidden">
                  {" "}
                  <button className="cursor-pointer focus:outline-none" onClick={() => setMenuOpen((prev) => !prev)}>{menuOpen ? <i className="bi bi-x"></i>: <i className="bi bi-list"></i> }</button>
                </div>
            </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
                  <div className="md:hidden flex flex-col items-center">
                  <div className="flex flex-col font-lg font-bold items-center space-y-2 py-4">
                    <Link className="text-gray-600 transition-colors" to={"/"}>Home</Link>
                    <Link className="text-gray-600 transition-colors" to={"/create"}>Create Post</Link>
                    <Link className="text-gray-600 transition-colors" to={"/communities"}>Communities</Link>
                    <Link className="text-gray-600 transition-colors" to={"/community/create"}>Create community</Link>
                  </div>
                  </div>
                )}
    </nav>
  )
}