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
        <>
            <form className="w-75 mt-3" onSubmit={handleSubmitProfile}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />
                {imageError && <p className="text-danger">{imageError}</p>}
                <button type="submit">Upload Profile Picture</button>
            </form>
        </>
    )
};

export default Profile;