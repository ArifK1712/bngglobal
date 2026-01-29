import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/OurExpertise";
import Industries from "./pages/Industries";
import Blog from "./pages/Blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-expertise" element={<Expertise />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
