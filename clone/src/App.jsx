
import Navbar from './Components/Navbar/Navbar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Video from './Pages/Videos'




const App = () => {
  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/video:categoryId/:videoId' element={<Video/>} />
      </Routes>

    </div>
  )
}

export default App