import { useState, useEffect } from "react";
import Post from "./Post";

const InfiniteFlatList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const NoContent = () => {
        return (
            <>
                <div className = "m-5">
                    <h2> No items listed </h2>
                </div>
            </>
        )
    }

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
            <div className="container-fluid d-flex justify-content-center">
                <div className="d-flex flex-column">
                    {
                        data.length === 0 ? <NoContent /> : data.map((item, index) => (
                            <div className="my-2" key={index}>
                                <Post
                                    title={item.sanitized_title}
                                    price={item.parsed_price}
                                    description={item.sanitized_description}
                                    imageUrl={item.imageUrl}
                                    email={item.email}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    
);
}

export default InfiniteFlatList;