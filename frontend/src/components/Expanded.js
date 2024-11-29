const Expanded = ({ title, price, description, imageUrl, email, isDark}) => {
    return (
        <div className = "p-4 container-fluid h-100">
            <div className = "row h-100 align-items-center">
                <div className = "col-6">
                    <img className = "w-100 h-100" src={imageUrl || "/images/placeholder.jpeg"} alt={title}/>
                </div>
                <div className = {`expanded-text col-6 ${isDark? "dark-mode" : "light-mode"}`}>
                    <h2> {title} </h2>
                    <p className = "mb-0" >{email}</p>
                    <p className = "text" style = {{fontSize: "15px", maxHeight: "10rem"}}> ${price} </p>
                    <div className = "overflow-auto" style = {{maxHeight: "20rem"}}>
                        <p> {description} </p>
                    </div>
                    <hr className = "mt-0"></hr>
                    <button className={`btn ${isDark ? "btn-outline-light" : "btn-outline-secondary"} mb-1 w-100`}> Add to cart </button>
                    <br></br>
                </div>
            </div>


        </div>
    )
}

export default Expanded;