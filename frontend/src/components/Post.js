import {useState} from "react";

const styles = {
    "maxWidth" : "30rem",
    "height": "30rem"
}

const Post = () => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved((prevState) => !prevState);
    }

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }

    return (
        <div className="card" style={styles}>
            <img src = "/images/placeholder.jpeg" alt = "..."></img>
            <div className = "d-flex justify-content-between p-2 align-items-center">
                <h5 className = "card-title m-0"> Post title </h5>
                <div>
                    <button className = "btn bi bi-cart pe-1" onClick = {handlePurchase}></button>
                    <button className = {saved ? "btn bi bi-bookmark-check-fill" : "btn bi bi-bookmark"}
                            onClick = {handleSave}></button>

                </div>
            </div>
            <hr className = "m-0"></hr>
            <div className="card-body">
                <p className="card-subtitle">$12.99</p>
                <p className="card-text"> Post description.
                    The description should be a maximum of 3 sentences.
                    Should not allow user to do any more than 3
                </p>
            </div>
        </div>
    )
}

export default Post;