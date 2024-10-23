import { useState, useEffect } from "react";
import Post from "./Post";

const InfiniteFlatList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect( () => {
        // Define the async function
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await fetch("http://localhost:8080/posts");
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const posts = await response.json(); // Assuming the posts data is directly returned
                setData(posts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts().then(() => console.log("Posts fetched"));
    }, []);

    const NoContent = () => {
        return (
            <>
                <div className = "d-flex container-fluid justify-content-center m-5">
                    <h2> No items listed </h2>
                </div>
            </>
        )
    }

    return (
        <div className="container-fluid d-flex justify-content-center ">
            <div className="d-flex flex-column">
                {
                    data.length === 0 ? <NoContent /> : data.map((item, index) => (
                        <div className="my-2" key={index}>
                            <Post
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                imageUrl={item.imageUrl}
                                email={item.email}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    
);
}

export default InfiniteFlatList;