import { Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Signin from "./components/Signin";
import UploadPage from "./components/UploadPage";
import ProfilePage from "./components/Profile";

import {useState, useEffect} from "react";

function App() {
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
      const storedMode = (localStorage.getItem('isDark') == 'true');
      setIsDark(storedMode);
    }, []);

    const toggleDarkMode = () => {
      setIsDark((prevMode) => {
          const newMode = !prevMode;
          localStorage.setItem('isDark', newMode); 
          return newMode;
      });
  };

    return (
      <div className={`root-body ${isDark ? "dark-mode" : "light-mode"}`}>
        <Navbar user = {user} setUser = {setUser} toggleDarkMode={toggleDarkMode} isDark={isDark}/>
          <Routes>
            <Route path="/" element={<Home user = {user} isDark={isDark}/>}/>
            <Route path="/register" element={<Signup user = {user} isDark={isDark}/>} />
            <Route path="/user_upload" element={<UploadPage  user = {user} isDark={isDark} />} />
            <Route path="/login" element={<Signin isDark={isDark}/>} />
            <Route path="/user_profile" element={<ProfilePage user = {user} isDark={isDark}/>} />
          </Routes>

      </div>
    )
  }
  
  export default App

