import { Route, Routes } from 'react-router'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <div className='min-h-screen transition-opacity bg-[#F9F9FB] duration-700 pt-2'>
      <Navbar />
      <div className='container mx-auto px-4 pt-16'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
