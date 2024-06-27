import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './assets/components/contexts/AuthContext';
import Header from './assets/components/header/Header';
import Footer from './assets/components/footer/Footer';
import HomePage from './assets/components/pages/homepage/HomePage';
import Login from './assets/components/pages/login/Login'
// import Show from './assets/components/pages/show/Show'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/:id" element={<Show />} /> */}
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </AuthProvider>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
