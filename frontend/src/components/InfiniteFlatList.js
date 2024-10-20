import {useState} from "react";
import Post from "./Post";

const InfiniteFlatList = () => {
    //Mock data for now
    const [data, setData] = useState([1, 2, 3, 4, 5]);
    return (
        <div className = "container-fluid d-flex justify-content-center ">
            <div className = "d-flex flex-column">
                {
                    data.length === 0 ? <p> No items for sale </p> : data.map((item, index) => (
                        <div className = "my-2" key = {index}>
                            <Post />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default InfiniteFlatList;