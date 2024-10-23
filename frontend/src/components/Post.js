import { useState } from "react";

const styles = {
    "maxWidth": "30rem",
    "height": "30rem"
}

const Post = ({ title, price, description, imageUrl, email }) => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved((prevState) => !prevState);
    }

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }


    return (
        <div className="card" style={styles}>
            <img className = "h-75" src={imageUrl || "/images/placeholder.jpeg"} alt={title} />
            <div className="d-flex justify-content-between p-2 align-items-center">
                <h5 className="card-title m-0 ps-1"> {title} </h5>
                <div>
                    <button className="btn bi bi-cart pe-1" onClick={handlePurchase}></button>
                    <button className={saved ? "btn bi bi-bookmark-check-fill" : "btn bi bi-bookmark"}
                        onClick={handleSave}></button>

                </div>
            </div>
            <hr className="m-0"></hr>
            <div className="card-body">
                <h6 className="card-subtitle text-body-secondary">{price} | {email}</h6>
                <p className="card-text"> {description}
                </p>
            </div>
        </div>
    )
}

export default Post;