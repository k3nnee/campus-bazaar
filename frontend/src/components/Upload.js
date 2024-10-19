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
            }
        )
    }

    return (
        <div className="Parent">
            <h2> Create a new Listing</h2>

            <form className="upload-container" onSubmit={handleSubmit}>
                <label> Enter item name: </label>
                <input type="text" id="item_name" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label> Include a description (up to 3 sentences) </label>
                <input type="text" id="body" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>Upload a image of your item</label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    name="image" // Ensure the name attribute matches the key in multer
                />

                {!isPending && <button>UPLOAD</button>}
                {isPending && <button disabled>UPLOADING ....</button>}
            </form>
        </div>
    )
}

export default Upload;