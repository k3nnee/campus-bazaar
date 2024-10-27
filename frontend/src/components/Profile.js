import { useState } from "react"
import "../css/css.css"

const Profile = (prop) => {
    const [email, setEmail] = useState(''); // Placeholder email, replace with actual email from backend or context
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [image, setImage] = useState(null);
    const [imageError, setImageError] = useState('')
    const [shakeFields, setShakeFields] = useState([]); // State for animation

    const validateImage = () => {
        if (!image) {
            setImageError("*Please upload an image");
            return;
        } else {
            setImageError(''); // Clear the error if the image is valid
        }
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();

        if (imageError || !image) {
            return
        }

        const formData = new formData();
        formData.append('email', prop.user);
        formData.append('image', image);

        fetch('http://localhost:8080/profile', {

            method: 'POST',
            body: formData,
            
        }).then(async (res) => {
            setIsPending(false);
            await handleResponse(await res.json());
        })

    }

    const handleResponse = async (data) => {
        if("message" in data){
            alert(data.message)
            window.location.href = "http://localhost:3000/"
        }else{
            return (
                alert(data.error)
            )
        }
    }

    return (
        <>
        </>
    )
};

export default Profile;