import {Routes, Route} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup"
import Navbar from "./components/Navbar"
import Signin from "./components/Signin";
import UploadPage from "./components/UploadPage";
import ProfilePage from "./components/Profile";
import Cart from "./components/Cart";
import {useState, useEffect} from "react";
import {socket} from "./socket";

function App() {
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(false);
    const [notified, setNotified] = useState(false);

    const notifyUser = async () => {
        setNotified((prevState) => !prevState);
    };

    socket.on("broadcast", notifyUser);



    useEffect(() => {
      const storedMode = (localStorage.getItem('isDark') === 'true');
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
          {
              notified &&
              <div className="btn position-fixed w-100" onClick={() => notifyUser()} style = {{zIndex: "100"}}>
                  <div className="alert alert-dark p-2" role="alert">
                      New items for sale, reload to view the new items. Click to close.
                  </div>
              </div>
          }
        <Navbar user = {user} setUser = {setUser} toggleDarkMode={toggleDarkMode} isDark={isDark}/>
          <Routes>
            <Route path="/" element={<Home user = {user} isDark={isDark}/>}/>
            <Route path="/register" element={<Signup user = {user} isDark={isDark}/>} />
            <Route path="/user_upload" element={<UploadPage  user = {user} isDark={isDark} />} />
            <Route path="/login" element={<Signin isDark={isDark}/>} />
            <Route path="/user_profile" element={<ProfilePage user = {user} isDark={isDark}/>} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

      </div>
    )
  }
  
  export default App

