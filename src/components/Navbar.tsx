import { useState } from "react"
import { Link } from "react-router"
import { useAuth } from "../context/AuthContext";

export const Navbar = () =>{
    const [menuOpen, setMenuOpen] = useState(false);
    const {signInWithGoogle, signInwithGithub, signOut, user} = useAuth();

    const profilePicUrl = user?.user_metadata.avatar_url;
  return (
    <nav className="fixed top-0 w-full z-40 bg-[#141414] backdrop-blur-md shadow-md">
        <div className="max-w-[95%] mx-auto px-1">
            <div className="flex justify-between items-center">
                <Link to={"/"}><img src="/src/assets/Pixo.svg" width={80} alt="Logo" /></Link>
                {user ? (
            <div className="hidden md:flex items-center space-x-8 text-2xl font-bold">
              <Link className="text-white hover:text-[#F88379] transition-colors" to={"/"}><i className="bi bi-house-fill mr-3 text-2xl"></i></Link>
              <Link className="text-white hover:text-[#F88379] transition-colors" to={"/create"}><i className="bi bi-plus-square-fill"></i></Link>
              <Link className="text-white hover:text-[#F88379] transition-colors" to={"/communities"}><i className="bi bi-people-fill"></i></Link>
              <Link className="text-white hover:text-[#F88379] transition-colors" to={"/community/create"}><i className="bi bi-plus-circle-fill"></i></Link>
              <Link to={"/profile"}>
                <img className="rounded-[50px] border-[#F88379] border-2" src={profilePicUrl} width={35} alt="profile" />
              </Link>
              <button className="cursor-pointer text-white" onClick={signOut}><i className="bi bi-box-arrow-right mr-3"></i></button>
            </div>
          ) : (
            <div>
              <div className="hidden md:flex items-center space-x-8 text-2xl font-bold">
                  <Link className="text-white hover:text-[#F88379] transition-colors" to={"/"}><i className="bi bi-house-fill mr-3"></i></Link>
                  <button className="text-white hover:text-[#F88379] transition-colors" onClick={signInWithGoogle}>
                <i className="bi bi-google mr-3"></i>
              </button>
              <button className="text-white hover:text-[#F88379] transition-colors" onClick={signInwithGithub}>
                <i className="bi bi-github mr-3"></i>
              </button>
                </div>
            </div>
          )}
                {/* Mobile menu button */}
                <div className="md:hidden flex flex-row">
                  {" "}
                  {user ? (
                    <Link to={"/profile"}>
                      <img className="rounded-[50px] m-2 border-[#F88379] border-2" src={profilePicUrl} width={40} alt="profile" />
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  <button className="cursor-pointer focus:outline-none text-3xl text-white" onClick={() => setMenuOpen((prev) => !prev)}>{menuOpen ? <i className="bi bi-x"></i>: <i className="bi bi-list"></i> }</button>
                </div>
            </div>
        </div>

        {/* Desktop Auth */}
        <div className="flex items-center space-x-4">

        </div>
        {/* Mobile Menu */}
        {menuOpen && (
                  <div className="md:hidden flex flex-col items-center">
                    {
                      user ? (
                      <div className="flex flex-col text-white font-lg font-bold items-center space-y-2 py-4">
                        <Link className="" to={"/"}>Home</Link>
                        <Link className="" to={"/create"}>Add Post</Link>
                        <Link className="" to={"/communities"}>Community</Link>
                        <Link className="" to={"/community/create"}>Add Community</Link>
                        <button onClick={signOut}>Sign Out</button>
                      </div>) : (
                        <div className="flex flex-col text-white font-lg font-bold items-center space-y-2 py-4">
                          <Link className="" to={"/"}>Home</Link>
                          <button onClick={signInWithGoogle}>Google SignIn</button>
                          <button onClick={signInwithGithub}>Github SignIn</button>
                        </div>
                      )
                    }
                  </div>
                )}
    </nav>
  )
}