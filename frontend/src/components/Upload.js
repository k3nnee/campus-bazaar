import {useState} from "react"
import "../css/css.css"

const Upload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [image, setImage] = useState(null);

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image); // Add file
        formData.append('title', title); // Add other form fields
        formData.append('description', description);
        formData.append('email', "testing@gmail.com");

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
            // headers: { "Content-Type": "application/json" },
        }).then(() => {
                console.log("Listing added")
                setIsPending(false);
                setTitle('');
                setDescription('');
            }
        )
    }

    return (
        <>
            <div className="card mt-5">
                <div className="card-header pt-3" style = {{backgroundColor : "#063761", color: "white"}}>
                    <h3>
                        Uploading a post
                    </h3>
                </div>
                <div className="my-5 d-flex justify-content-center">
                    <form className="w-75 mt-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="itemName" className="form-label">Enter item name</label>
                            <input type="text" className="form-control" id="itemName" placeholder="Enter here" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Enter a description</label>
                            <textarea className="form-control" id="description" rows="4" placeholder="Enter here" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="w-50 d-none d-lg-block">
                            <label htmlFor="imageUpload" className="form-label">Upload an image</label>
                            <br></br>
                            <input
                                className="form-control"
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                name="image" // Ensure the name attribute matches the key in multer
                            />
                        </div>
                        <div className="d-block d-lg-none">
                            <label htmlFor="imageUpload" className="form-label">Upload an image</label>
                            <br></br>
                            <input
                                className="form-control"
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                name="image" // Ensure the name attribute matches the key in multer
                            />
                        </div>
                        <div className = "container-fluid d-flex justify-content-end p-0 mt-2">
                            {
                                !isPending ?
                                    <button className = "btn btn-outline-secondary"> Upload post </button>
                                    :
                                    <button className = "btn btn-outline-secondary" disabled> Uploading ... </button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Upload;