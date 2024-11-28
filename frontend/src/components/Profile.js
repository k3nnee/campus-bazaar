import { useState } from "react"
import "../css/css.css"

const Profile = (prop) => {
    const [profileImage, setProfileImage] = useState(null);
    const [imageError, setImageError] = useState('');
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

        fetch('http://localhost:8080/profile', {

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
            window.location.href = "http://localhost:8080/"
        }else{
            return (
                alert(data.error)
            )
        }
    }
    

    return (
        <div className={`body-content ${prop.isDark ? "dark-mode" : "light-mode"}`}>
            <div className={`card mt-5 mx-3 mx-lg-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
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
            </div>
        </div>
    )
};

export default Profile;