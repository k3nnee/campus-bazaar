import { useState } from "react";

const styles = {
    "maxWidth": "30rem",
    "height": "30rem"
}

const Post = () => {
    const[title,setTitle] = useState('');
    const[body,setBody] = useState('')
    const[userName,setUserName] = useState('')
    const [saved, setSaved] = useState(false);
    const [isPending,setIsPending] = useState(false)
    const handleSave = () => {
        setSaved((prevState) => !prevState);
    }

    const handlePurchase = () => {
        console.log("Print used for placeholder")
    }
     const [itemName, setItemName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault()
        const post_info = {title,body,userName}
        fetch('http://localhost:8080/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(post_info),
        }).then( () => {
            console.log("Listing ADDED")
            setIsPending(false);
        }

        )
        console.log(post_info)
    }
    return (
        <div className="Parent"> 
        <h2> Create a new Listing</h2>

        <form className="upload-container" onSubmit={handleSubmit}>
            <label >ENTER YOUR ITEM NAME : </label>
            <input type="text" id="item_name" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <label>Include a description</label>
            <input type="text" id="body" value={body} onChange={(e) => setBody(e.target.value)}/> 
            <label >Enter your name </label> 
            <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)}/> 
            {/* <button id="submit" className="submit-button">submit</button> */}
            {!isPending && <button>UPLOAD</button>}
            {isPending && <button disabled>UPLOADING ....</button>}
        </form>
        </div>
        // <div className="card" style={styles}>
        //     <img src = "/images/placeholder.jpeg" alt = "..."></img>
        //     <div className = "d-flex justify-content-between p-2 align-items-center">
        //         <h5 className = "card-title m-0"> Post title </h5>
        //         <div>
        //             <button className = "btn bi bi-cart pe-1" onClick = {handlePurchase}></button>
        //             <button className = {saved ? "btn bi bi-bookmark-check-fill" : "btn bi bi-bookmark"}
        //                     onClick = {handleSave}></button>

        //         </div>
        //     </div>
        //     <hr className = "m-0"></hr>
        //     <div className="card-body">
        //         <p className="card-subtitle">$12.99</p>
        //         <p className="card-text"> Post description.
        //             The description should be a maximum of 3 sentences.
        //             Should not allow user to do any more than 3
        //         </p>
        //     </div>
        // </div>
    )
}

export default Post;