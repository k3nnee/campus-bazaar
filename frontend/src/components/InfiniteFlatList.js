import { useState, useEffect } from "react";
import Post from "./Post";

const InfiniteFlatList = () => {
    //Mock data for now
    // const [data, setData] = useState([1, 2, 3, 4, 5]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the async function
        const fetchPosts = async () => {
            try {
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

        // Call the async function
        fetchPosts();
    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center ">
            <div className="d-flex flex-column">
                {
                    data.length === 0 ? <p> No items for sale </p> : data.map((item, index) => (
                        <div className="my-2" key={index}>
                            <Post
                            
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                imageUrl={item.imageUrl}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    
);
}

export default InfiniteFlatList;