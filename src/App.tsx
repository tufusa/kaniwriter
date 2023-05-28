import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/home'
import './App.css'
import {Header} from "./components/header";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
