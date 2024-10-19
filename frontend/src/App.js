import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Post from "./components/Post";
 
function App() {
  
    return (
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

