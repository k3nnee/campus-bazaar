import InfiniteFlatList from "./InfiniteFlatList";
import DesktopUI from "./DesktopUI";
import {useEffect, useState} from "react";
const Body = ({isDark, user}) => {
    const windowDimension = window.innerWidth;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlighted, setHighlighted] = useState(null);

    useEffect( () => {
        const fetchPosts = async () => {
            console.log(user);
            try {
                setLoading(true)
                const response = await fetch("/posts", {
                    method: "POST",
                    body: JSON.stringify({email: user}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
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
    }, [isDark]);

    const Spinner = () => {
        return (
            <div className = "position-absolute d-flex align-items-center justify-content-center vw-100 h-100 pb-5 bg-secondary-subtle">
                <div className="spinner-border mb-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    console.log(data)

    return (
        <div className={`position-relative body-content ${isDark ? "dark-mode" : "light-mode"}`}>
            {
                loading && <Spinner />
            }
            {
                windowDimension <= 1000 ? <InfiniteFlatList setHighlight = {setHighlighted} data = {data} isDark={isDark}/> : <DesktopUI highlight = {highlighted} setHighlight = {setHighlighted} data = {data} isDark={isDark}/>
            }
        </div>
    )
}

export default Body;