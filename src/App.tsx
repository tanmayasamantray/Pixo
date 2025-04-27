import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { CreatePostPage } from './pages/CreatePostPage'
import { PostPage } from './pages/PostPage'

function App() {

  return (
    <div className='min-h-screen transition-opacity bg-[#232323] duration-700 pt-2'>
      <Navbar />
      <div className='container mx-auto px-4 pt-16'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<CreatePostPage />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
