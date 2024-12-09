import { useState, useEffect } from "react"
import "../css/css.css"
import Post from "./Post";

const Profile = (prop) => {
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState('');
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    const [userPosts, setUserPosts] = useState([]);
    const [currentProfilePic, setCurrentProfilePic] = useState(null);

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

        const fetchUserPosts = async () => {
            try {
                const response = await fetch('/user-posts', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserPosts(data);
                } else {
                    console.error("Failed to fetch user posts");
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        const fetchProfilePic = async () => {
            try {
                const response = await fetch('/profile-pic', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setCurrentProfilePic(data.profilePicUrl);
                } else {
                    console.error("Failed to fetch profile picture");
                }
            } catch (error) {
                console.error("Error fetching profile picture:", error);
            }
        };

        fetchBookmarkedPosts();
        fetchUserPosts();
        fetchProfilePic();
    }, []);
    

    return (
        <div className={`body-content  ${prop.isDark ? "dark-mode" : "light-mode"}`}>
{/*<<<<<<< HEAD*/}
{/*            <div className={`card mt-5 mx-3 mb-5 mx-lg-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>*/}
{/*                <div className="upload-profile mt-3 pt-3 d-flex align-items-center">*/}
{/*                    <img src={currentProfilePic} alt="Profile" className={`profile-pic rounded-circle me-2 border ${prop.isDark ? "dark-mode" : "light-mode"}`}/>*/}
{/*                    <form className="mt-3" onSubmit={handleSubmitProfile}>*/}
{/*                        <div className="ps-5 mb-3">*/}
{/*=======*/}
            <div className="upload-profile mt-3 pt-5 d-flex align-items-center" >
                <img src={currentProfilePic} alt="Profile" className={`profile-pic rounded-circle me-2 border ${prop.isDark ? "dark-mode" : "light-mode"}`} style={{position: 'relative'}}/>
                <h4><strong>{prop.user}</strong></h4>
                <div className="ms-3">
                    <button
                        className={`gear-btn btn ${prop.isDark ? "btn-outline-light" : "btn-outline-secondary"} p-2`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#profileSettings"
                        aria-expanded="false"
                        aria-controls="profileSettings"
                        style={{position: 'relative', transform: 'translate(100%, -320%)', background: 'none'}}
                    > 
                        <i className={`bi bi-gear-fill fa-2x ${prop.isDark ? "dark-mode" : "light-mode"}`}></i>
                    </button>
                </div>
                <div className="collapse mt-3" id="profileSettings">
                    <form className="mt-3 d-flex align-items-center" onSubmit={handleSubmitProfile}>
                        <div className="mb-3">
                            <label htmlFor="imageUpload" className="fs-3 pb-3 flexform-label">Upload a Profile Picture</label>
                            <br />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfileImage(e.target.files[0])}
                                name="image"
                            />
                            {imageError && <p className="text-danger">{imageError}</p>}
                            <br />
                            <div className="container-fluid d-flex justify-content-end">
                                <button className={`btn ${prop.isDark ? "btn-outline-light" : "btn-outline-secondary"}`}>Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>

                <div style={{height: '20px'}}></div>
                <div className={`bookmarks p-3 m-4 pt-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                    <h3 className="ps-5 pb-3"><strong>Bookmarks - {bookmarkedPosts.length}</strong></h3>
                    <div className={`mb-5 container horizontal-scrollable d-flex ${bookmarkedPosts.length > 0 ? 'justify-content-start' : 'justify-content-center'} mb-2 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                        {bookmarkedPosts.length > 0 ? 
                            bookmarkedPosts.map((post) => (
                                <div className="bookmarked-posts d-flex justify-content-start" key={post.id}>
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
                <div className={`posts p-3 m-4 pt-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                    <h3 className="ps-5 pb-3"><strong>Posts - {userPosts.length}</strong></h3>
                    <div className={`mb-5 container horizontal-scrollable d-flex ${userPosts.length > 0 ? 'justify-content-start' : 'justify-content-center'} ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                        {userPosts.length > 0 ?
                            userPosts.map((post) => (
                                <div className="user-posts" key={post.id}>
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
                            : <p>No posts found.</p>}
                    </div>
                </div>
            </div>
    )
};

export default Profile;