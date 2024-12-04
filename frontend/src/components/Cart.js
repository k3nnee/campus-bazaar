import { useEffect, useState } from "react";
import "../css/css.css";
const Cart = () => {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/showCart', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                } else {
                    console.error("Failed to fetch cart items");
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div className="cart-page-container">
            {items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div class="container mt-5 p-3 rounded cart">
                    <div class="row no-gutters">

                        <div class="col-md-8 product-details mr-2"    style={{
        maxHeight: '500px',  
        overflowY: 'auto',   
    }}>
                            {items.map((item) => (
                                <div class="d-flex mt-3 p-2 items rounded" key={item.id}     style={{
                                    position: 'relative',
                                    border: '1px solid #ccc',  
                                    borderRadius: '5px',  
                                    padding: '10px',  
                                    backgroundColor: '#f9f9f9',  
                                }}>
                                    <img className="rounded" src={item.image} width="40" alt={item.title} />
                                    <button className="bi bi-x"
                                            style={{
                                                position: 'absolute',
                                                top: '0px',
                                                right: '0px',
                                            }}
                                        >
                                            
                                        </button>
                                    <div className="ms-4 d-flex justify-content-between w-100 content-fluid">
                                        <span class="font-weight-bold" style={{ marginLeft: "20px", fontFamily: "Helvetica, sans-serif" }}>{item.title}</span>
                                        <span className="font-weight-bold" style={{ fontFamily: "Helvetica, sans-serif", fontSize: '15px', marginLeft: 'auto' }}>${item.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div class="col-md-4">
                            <div class="payment-info p-3 rounded bg-info">
                                <h6>Order Summary</h6>
                                <hr />
                                <div class="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>$</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-between">
                                    <span>Total</span>
                                    <span>$</span>
                                </div>
                                <button class="btn btn-primary btn-block mt-3">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>


            )}
        </div>
    );
};

export default Cart;
