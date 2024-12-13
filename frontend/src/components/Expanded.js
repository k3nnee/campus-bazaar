import { useState, useEffect } from "react";

const Expanded = ({id, title, price, description, imageUrl, email, isDark}) => {
    const [isInCart, setIsInCart] = useState(() => {
        const savedStatus = localStorage.getItem(`cart-${id}`);
        return savedStatus ? JSON.parse(savedStatus) : false;
    });

    useEffect(() => {
        localStorage.setItem(`cart-${id}`, JSON.stringify(isInCart));
    }, [isInCart, id]);

    const handleCartUpdate = async () => {
        try{
            const response = await fetch('/updateCart',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({id, action: isInCart ? 'remove' : 'add' })
                }
    
            );
    
            if (response.ok) {
                console.log("Item added/removed from cart successfully");
                const {inCart} = await response.json();
                setIsInCart(inCart);
                localStorage.setItem(`cart-${id}`, JSON.stringify(inCart));
                window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id, inCart } }));
        } else {
                console.error("Failed to update item in cart");
            }
        } catch (error){
            console.error("Error failed to update item in cart: ", error);
        }
        
    }

    useEffect(() => {
        // Listen for cart updates from other components
        const handleCartEvent = (event) => {
            if (String(event.detail.id) === String(id)) {
                setIsInCart(event.detail.inCart);
                localStorage.setItem(`cart-${id}`, JSON.stringify(event.detail.inCart));
            }
        };

        window.addEventListener('cartUpdated', handleCartEvent);
        return () => {
            window.removeEventListener('cartUpdated', handleCartEvent);
        };
    }, [id]);

    return (
        <div className = "p-4 container-fluid h-100">
            <div className = "row h-100 align-items-center">
                <div className = "col-6 h-100">
                    <img className = "w-100 h-100 object-fit-cover" src={imageUrl || "/images/placeholder.jpeg"} alt={title}/>
                </div>
                <div className = {`expanded-text col-6 ${isDark? "dark-mode" : "light-mode"}`}>
                    <h2> {title} </h2>
                    <p className = "mb-0" >{email}</p>
                    <p className = "text" style = {{fontSize: "15px", maxHeight: "10rem"}}> ${price} </p>
                    <div className = "overflow-auto" style = {{maxHeight: "20rem"}}>
                        <p> {description} </p>
                    </div>
                    <hr className = "mt-0"></hr>
                    <button className={`btn ${isDark ? "btn-outline-light" : "btn-outline-secondary"} mb-1 w-100`} onClick={handleCartUpdate}> {isInCart ? "Remove from cart" : "Add to cart"} </button> 
                    
                    <br></br>
                </div>
            </div>


        </div>
    )
}

export default Expanded;