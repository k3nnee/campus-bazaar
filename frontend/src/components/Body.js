import InfiniteFlatList from "./InfiniteFlatList";
import DesktopUI from "./DesktopUI";
import {useEffect, useState} from "react";
import {socket} from "../socket"

const Body = () => {
    const windowDimension = window.innerWidth;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlighted, setHighlighted] = useState(null);

    const renderPost = async () => {
        try {
            const response = await fetch("http://localhost:8080/posts");
            const posts = await response.json();
            setData(posts);
        } catch (err) {
            console.log(err.message);
        }
    };

    socket.on("broadcast", renderPost);

    useEffect( () => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch("http://localhost:8080/posts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const posts = await response.json();
                setData(posts);
            } catch (err) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts().then(() => console.log("Posts fetched"));
    }, []);

    const Spinner = () => {
        return (
            <div className = "position-absolute d-flex align-items-center justify-content-center vw-100 h-100 pb-5 bg-secondary-subtle">
                <div className="spinner-border mb-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                loading && <Spinner />
            }
            {
                windowDimension <= 1000 ? <InfiniteFlatList setHighlight = {setHighlighted} data = {data}/> : <DesktopUI highlight = {highlighted} setHighlight = {setHighlighted} data = {data}/>
            }
        </div>
    )
}

export default Body;