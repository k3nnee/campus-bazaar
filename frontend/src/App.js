import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Upload from "./components/Upload";
import Signin from "./components/Signin";
import InfiniteFlatList from "./components/InfiniteFlatList";

function App() {
  

    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<InfiniteFlatList />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/user_upload" element={<Upload />} />
            <Route path="/login" element={<Signin />} />
          </Routes>
        </div>
      </>
    )
  }
  
  export default App

