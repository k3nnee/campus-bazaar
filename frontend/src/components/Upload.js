import { useState } from "react"
import "../css/css.css"
import {socket} from "../socket";

const handleResponse = (data) => {
    console.log(data.message)
    if("message" in data){
        alert(data.message)
        window.location.href = "/"
    }else{
        return (
            alert(data.error)
        )
    }
}

const upload_post = (data) => {
    socket.emit("create_post", data);
}

socket.on("upload_response", (data) => {
    handleResponse(data)
})


const Upload = (prop) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [image, setImage] = useState(null);
    const [titleError, setTitleError] = useState('');
    const [priceError, setPriceError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [imageError, setImageError] = useState('')
    const [shakeFields, setShakeFields] = useState([]);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    //ERROR MESSAGES WHEN INPUT IS NOT CORRECT
    const validateTitle = (value) => {
        if (value.length < 5 || value.length > 100) {
            setTitleError("*Title must be between 5-100 characters");
        } else {
            setTitleError(''); 
        }
    };
    const validatePrice = (value) => {
        const parsedPrice = parseFloat(value);
        const isTwoDecimals = /^\d+(\.\d{1,2})?$/.test(value);  
        if (!isTwoDecimals || parsedPrice <= 0) {
            setPriceError("*Price must be a positive value with up to two decimal places");
        } else {
            
            setPriceError(''); 
        }
    };
    
    
    
    const validateDescription = (value) => {
        if (value.length > 500 || value.length < 20) {
            setDescriptionError("*Description must be between 20-500 characters");
        } else {
            
            setDescriptionError(''); 
        }
    };
    const validateImage = () => {
        if (!image) {
            setImageError("*Please upload an image");
            return;
        } else {
            setImageError(''); 
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (imageError || !image) {
            return
        }
        validateTitle(title);
        validatePrice(price);
        validateDescription(description);

        const newShakeFields = [];
        if (titleError) newShakeFields.push('title');
        if (priceError) newShakeFields.push('price');
        if (descriptionError) newShakeFields.push('description');
        // if (imageError) newShakeFields.push('image');

        if (newShakeFields.length > 0) {
            setShakeFields(newShakeFields);
            setTimeout(() => {
                setShakeFields([]);
            }, 400);
            return;
        }

        const data = {};

        data.image = image;
        data.title = title;
        data.price = price;
        data.description = description;
        data.email = prop.user;
        data.hour = hour;
        data.minute = minute;
        data.second = second;

        upload_post(data);
    }


    return (
        <div className={`body-content ${prop.isDark ? "dark-mode" : "light-mode"}`}>
            <div className={`card mt-3 mx-3 h-auto mx-lg-5 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                <div className={`card-header pt-3 ${prop.isDark ? "dark-mode" : "light-mode"}`}>
                    <h3>
                        Uploading a post
                    </h3>
                </div>
                <div className="my-1 d-flex justify-content-center">
                    <form className="w-75 mt-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="itemName" className="form-label">Enter item name</label>
                            <input
                                type="text"
                                className={`form-control ${shakeFields.includes('title') ? 'input-invalid' : ''} ${prop.isDark ? "dark-mode" : "light-mode"}`}
                                id="itemName"
                                placeholder="Enter here"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value); validateTitle(e.target.value); }}></input>
                            {titleError && <p className="text-danger">{titleError}</p>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Enter Price</label>
                            <input
                                type="number"
                                min="0"
                                step={0.01}
                                className={`form-control ${shakeFields.includes('price') ? 'input-invalid' : ''} ${prop.isDark ? "dark-mode" : "light-mode"}`}
                                id="price"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => { setPrice(e.target.value); validatePrice(e.target.value); }}></input>
                            {priceError && <p className="text-danger">{priceError}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Enter a description</label>
                            <textarea
                                className={`form-control ${shakeFields.includes('description') ? 'input-invalid' : ''} ${prop.isDark ? "dark-mode" : "light-mode"}`}
                                id="description" rows="4"
                                placeholder="Enter here"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value); validateDescription(e.target.value); }}></textarea>
                            {descriptionError && <p className="text-danger">{descriptionError}</p>}
                        </div>
                        <label htmlFor="time" className="form-label">Schedule a post: </label>
                        <div className="mb-3 d-flex">
                            <p className = "m-0 me-1">Hour</p>
                            <input type="number" id="hour" name="quantity" min="0" max="23" style={{width: "2.5rem"}} value={hour} className = "me-2" onChange={(e) => setHour(e.target.value)}></input>
                            <p className = "m-0 me-1">Minute</p>
                            <input type="number" id="minute" name="quantity" min="0" max="59" style={{width: "2.5rem"}} value={minute} className = "me-2" onChange={(e) => setMinute(e.target.value)}></input>
                            <p className = "m-0 me-1">Second</p>
                            <input type="number" id="second" name="quantity" min="0" max="59" style={{width: "2.5rem"}} value={second} className = "me-2" onChange={(e) => setSecond(e.target.value)}></input>
                        </div>
                        <div className="w-50 d-none d-lg-block">
                            <label htmlFor="imageUpload" className="form-label">Upload an image</label>
                            <br></br>
                            <input
                                className={`form-control ${shakeFields.includes('image') ? 'input-invalid' : ''} ${prop.isDark ? "dark-mode" : "light-mode"}`} 
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => { setImage(e.target.files[0]);  }}
                                name="image"
                            />
                            {imageError && <p className="text-danger">{imageError}</p>}
                        </div>
                        <div className="d-block d-lg-none">
                            <label htmlFor="imageUpload" className="form-label">Upload an image</label>
                            <br></br>
                            <input
                                className={`form-control ${shakeFields.includes('image') ? 'input-invalid' : ''} ${prop.isDark ? "dark-mode" : "light-mode"}`} 
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => { setImage(e.target.files[0]); }}
                                name="image"
                            />
                        </div>
                        <div className="container-fluid d-flex justify-content-end p-0 mt-2">
                            {
                                !isPending ?
                                    <button className={`btn ${prop.isDark ? "btn-outline-light" : "btn-outline-secondary"}`}> Upload post </button>
                                    :
                                    <button className="btn btn-outline-secondary" disabled> Uploading ... </button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Upload;