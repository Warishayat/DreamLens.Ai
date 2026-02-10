import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ImageCreation from './Pages/ImageCreation';
import VideoCreation from './Pages/VideoCreation';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/image-story" element={<ImageCreation/>} />
          <Route path="/video-story" element={<VideoCreation/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
  );
}


export default App;
