import { useState } from "react";

const styles = {
    "maxWidth": "25rem",
    "width": "auto",
    "height": "30rem",
    border: "1px solid",
    borderColor: "rgb(200,200,200)"
}

const Post = ({ id, title, price, description, imageUrl, email }) => {
    const [saved, setSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleSave = () => {
        setSaved((prevState) => !prevState) };
         
    

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }

    const handleDelete = async () => {
        console.log("Received ID in Post:", id);
        const response = await fetch(`http://localhost:8080/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        if (response.ok) {
            setIsDeleted(true);
            
            console.log("Post successfully deleted");
        } else {
            console.error("Failed to delete the post");
        }
    };
  
    if (isDeleted) {
        return null;
    }

    return (
        <div className="card mb-0" style={styles}>
            <div className = "container-fluid ps-3 my-2 d-flex justify-content-between">
                
                <p className = "m-1 text-start"> 
                    <img style={{height: 43, width: 43, objectFit: 'cover'}} src="/images/default_profile.jpg" class="rounded-circle me-2 border "/>
                    {email}</p>
                <div className="dropdown-delete d-flex justify-content-center " >
                    <button 
                        className="btn btn-link p-0 text-black text-decoration-none" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="true"
                    >
                        <strong>· · ·</strong>   
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end"style={{backgroundColor: "rgb(249, 55, 60)"}}>
                        <li ><a className="dropdown-delete d-flex justify-content-center m-0 text-white text-decoration-none" onClick={handleDelete} >Delete</a></li>
                    </ul>
                </div>
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
            </div>
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