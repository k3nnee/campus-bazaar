import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Signin from "./components/Signin";
import UploadPage from "./components/UploadPage";
import Profile from "./components/Profile";

import {useState} from "react";

function App() {
    const [user, setUser] = useState(null)

    return (
      <>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home user = {user} setUser = {setUser}/>}/>
            <Route path="/register" element={<Signup user = {user} />} />
            <Route path="/user_upload" element={<UploadPage  user = {user} />} />
            <Route path="/login" element={<Signin />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Routes>

      </>
    )
  }
  
  export default App

