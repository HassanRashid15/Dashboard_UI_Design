import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Home from './Pages/Home';
import Login from './Component/Login';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Signup from './Component/Signup';
// import PageNotFound from './Pages/PageNotFound';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
