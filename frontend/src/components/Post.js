import { useState,useEffect } from "react";

const styles = {
    "maxWidth": "25rem",
    "width": "auto",
    "height": "30rem"
}


const Post = ({ id, title, imageUrl, email, handleClick, index, profilePic_url, isDark}) => {
    const [saved, setSaved] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [isBookmarked, setIsBookmarked] = useState(() => {
        const savedStatus = localStorage.getItem(`isBookmarked-${id}`);
        return savedStatus ? JSON.parse(savedStatus) : false;
    });
 
    useEffect(() => {
        localStorage.setItem(`isBookmarked-${id}`, JSON.stringify(isBookmarked));
    }, [isBookmarked, id]);

    useEffect(() => {
        const fetchBookmarkData = async () => {
            try {
                const response = await fetch(`/${id}/bookmark-count`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setBookmarkCount(data.bookmarkCount);
                    setIsBookmarked(data.isBookmarked);
                } else {
                    console.error("Failed to fetch bookmark count");
                }
            } catch (error) {
                console.error("Error fetching bookmark count:", error);
            }
        };

        fetchBookmarkData();
    }, [id]);
    const handleSave = async () => {
        setSaved((prevState) => !prevState)
        const response = await fetch(`/${id}/bookmark`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok){
            const data = await response.json();
 
            setBookmarkCount(data.bookmarkCount);  
            setIsBookmarked(!isBookmarked);  
 
        }
        else{
            console.error("Failed to bookmark post");
        }
    };
    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }

    const handleDelete = async () => {
        console.log("Received ID in Post:", id);
        const response = await fetch(`/${id}`, {
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
    // console.log("profilepic: ", profilePic_url);
    return (
        <div className={`card-custom card mb-0 ${isDark ? "dark-mode" : "light-mode"}`} style={styles} onClick={() => handleClick(index)}>
            <div className="container-fluid ps-3 my-2 d-flex justify-content-between">
                <p className="m-1 text-start">
                    <img style={{ height: 43, width: 43, objectFit: 'cover' }} src={profilePic_url || "/images/default_profile.jpg"} alt={email} className={`profile rounded-circle me-2 border ${isDark ? "dark-mode" : "light-mode"}`} />
                    {email}</p>
                <div className="d-flex justify-content-center">
                    <button
                        className="btn btn-link p-0 text-black text-decoration-none"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="true"
                    >
                        <strong className={`dropdown-delete ${isDark ? "dark-mode" : "light-mode"}`}>· · ·</strong>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" style={{ backgroundColor: "rgb(249, 55, 60)" }}>
                        <li ><a className="dropdown-delete d-flex justify-content-center m-0 text-white text-decoration-none" onClick={handleDelete} >Delete</a></li>
                    </ul>
                </div>
            </div>

            <hr className="m-0"></hr>
            <img className="w-100 object-fit-cover" src={imageUrl || "/images/placeholder.jpeg"} alt={title} style = {{height: "70%"}}/>
            <hr className="m-0"></hr>
            <div className="d-flex justify-content-between p-2 align-items-center mt-2 mx-2">
                <h6 className="card-title m-0 ps-1"> <strong> {title} </strong> </h6>
                <div>
                <button className={`btn bi bi-cart ${isDark ? "dark-mode" : "light-mode"}`} onClick={handlePurchase}></button>
                    <button className={`${isBookmarked ? "btn bi bi-bookmark-check-fill" : "btn bi bi-bookmark"} ${isDark ? "dark-mode" : "light-mode"}`}
                        onClick={handleSave}></button>
                    <span className="ms-1">{bookmarkCount}</span>

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