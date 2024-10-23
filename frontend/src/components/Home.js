import "../css/css.css";
import InfiniteFlatList from "./InfiniteFlatList";
import {useEffect} from "react";
import Alert from "bootstrap/js/src/alert";
import Unauthorized from "./Unauthorized";

const Home = (prop) => {
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch("http://localhost:8080/getUser", {
                method : "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const user = await res.json();
            prop.setUser(user.user);
        }

        getUser().then(() => console.log("User fetched"));
    }, [])
    return (
        <>
            {
                prop.user ? <InfiniteFlatList /> : <Unauthorized message = "Please sign in to view contents"/>
            }
        </>
    );
};
export default Home;

