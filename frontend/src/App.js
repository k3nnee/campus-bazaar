import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Post from "./components/Post";
import Signin from "./components/Signin";


function App() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/user_upload" element={<Post />} />
            <Route path="/login" element={<Signin />} />
          </Routes>
        </div>
      </>
    )
  }
  
  export default App

