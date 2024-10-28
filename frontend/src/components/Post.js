import { useState } from "react";

const styles = {
    "maxWidth": "25rem",
    "width": "auto",
    "height": "30rem"
}

const Post = ({ title, imageUrl, email, handleClick, index}) => {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved((prevState) => !prevState) };
         
    

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }
  

    return (
        <div className="card-custom card mb-0" style={styles} onClick={() => handleClick(index)}>
            <div className = "container-fluid ps-3 my-2">
                <p className = "m-1"> {email} </p>
            </div>
            <hr className = "m-0"></hr>
            <img className = "w-100 h-75" src={imageUrl || "/images/placeholder.jpeg"} alt={title} />
            <hr className = "m-0"></hr>
            <div className="d-flex justify-content-between p-2 align-items-center mt-2 mx-2">
                <h6 className="card-title m-0 ps-1"> <strong> {title} </strong> </h6>
                <div>
                    <button className="btn bi bi-cart pe-1" onClick={handlePurchase}></button>
                    <button className={saved ? "btn bi bi-bookmark-check-fill" : "btn bi bi-bookmark"}
                        onClick={handleSave}></button>

                </div>
            </div>`
            {/*<hr className="m-0"></hr>*/}
            {/*<div className="card-body">*/}
            {/*    <h6 className="card-subtitle text-body-secondary">${price}</h6>*/}
            {/*    <p className="card-text"> {description}*/}
            {/*    </p>*/}
            {/*</div>*/}
        </div>
    )
}

export default Post;