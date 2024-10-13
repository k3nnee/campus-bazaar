import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import User_Upload from "./components/Post"
import Navbar from "./Navbar"
import Post from "./components/Post";


function App() {
    return (
<<<<<<< HEAD
        <>
            <nav>
                <div class="logo">CB</div>
                <div class="nav-items">
                    <a href="/">HOME</a>
                    <a href= "/">LOGIN</a>
                    <a href="/">About Us</a>

                </div>
            </nav>
            <div class="parent-container">
                <div class="content">
                    <div class="slider-wrapper">
                        Shop For
                        <div class="slider">
                            <div class="slider-text1">Shoes</div>
                            <div class="slider-text2">Cars</div>
                            <div class="slider-text3">AIRPODS</div>
                        </div>
                    </div>
                </div>
                <div class="image-container">
                    <img src="jordans.png" alt="shoes" width="300" height="300" />
                </div>
            </div>
        </>
    );
}

export default App;
=======
      <>
        <Navbar />
        <div className="container">
            
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SignUp" element={<Signup />} />
            <Route path="/User_Upload" element={<Post />} />
          </Routes>
        
        </div>
      </>
    )
  }
  
  export default App
>>>>>>> development
