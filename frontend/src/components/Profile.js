import { useState, useEffect } from "react"
import "../css/css.css"
import Post from "./Post";

const Profile = (prop) => {
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    //const [isPending, setIsPending] = useState(false);

    const validateImage = () => {
        if (!profileImage) {
            setImageError("*Please upload a profile picture");
            return;
        } else {
            setImageError('');  
        }
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();

        validateImage();

        const formData = new FormData();
        formData.append('email', prop.user);
        formData.append('profilePic', profileImage);

        fetch('/profile', {

            method: 'POST',
            body: formData,
            
        }).then(async (res) => {
            // setIsPending(false);
            await handleResponse(await res.json());
        })

    }

    const handleResponse = async (data) => {
        if("message" in data){
            alert(data.message)
            window.location.href = "/"
        }else{
            return (
                alert(data.error)
            )
        }
    }

    useEffect(() => {
        const fetchBookmarkedPosts = async () => {
            try {
                const response = await fetch('/bookmarked-posts', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setBookmarkedPosts(data);
                } else {
                    console.error("Failed to fetch bookmarked posts");
                }
            } catch (error) {
                console.error("Error fetching bookmarked posts:", error);
            }
        };

        fetchBookmarkedPosts();
    }, []);
    

    return (
        <div className={`body-content  ${prop.isDark ? "dark-mode" : "light-mode"}`}>
            <div className={`card mt-5 mx-3 mb-5 mx-lg-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                <form className="w-75 mt-3" onSubmit={handleSubmitProfile}>
                    <div className="ps-5 mb-3">
                        <label htmlFor="imageUpload" className="fs-3 pb-3 flexform-label">Upload a Profile Picture</label>
                        <br></br>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            name = "image"
                        />
                        {imageError && <p className="text-danger">{imageError}</p>}
                        <br></br>
                        <div className="container-fluid d-flex justify-content-end ">
                            <button className={`btn ${prop.isDark ? "btn-outline-light" : "btn-outline-secondary"}`}>Upload</button>
                        </div>
                    </div>
                </form>

                <h3 className="ps-5 ">Bookmarks</h3>
                <div className={`container horizontal-scrollable d-flex mb-2 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                    {bookmarkedPosts.length > 0 ? 
                        bookmarkedPosts.map((post) => (
                            <div className="bookmarked-posts p-2" key={post.id}>
                                <Post
                                    id={post.id}
                                    title={post.title}
                                    imageUrl={post.imageUrl}
                                    email={post.email}
                                    profilePic_url={post.profilePic_url}
                                    isDark={prop.isDark}
                                    handleClick={() => {}}
                                />
                                
                            </div>
                        ))
                    : <p>No bookmarked posts found.</p>}
                </div>


            </div>
        </div>
    )
};

export default Profile;