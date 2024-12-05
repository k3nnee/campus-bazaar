import { useEffect, useState } from "react";
import "../css/css.css";
const Cart = () => {
    const [saved, setSaved] = useState(false);

    const [items, setItems] = useState([]);
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
    const handleRemove = async (id) => {
        console.log("Remove from cart request:", id);

        try {
            const response = await fetch(`/add_to_cart`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id }),
            });


            if (response.ok) {
                const data = await response.json();
                console.log("Item removed from cart successfully:", data);
                fetchCart(); //RELOAD THE PAGE WHEN DELELTEING
            } else {
                console.error("Failed to remove item:", response.status, await response.text());
            }
        } catch (error) {
            console.error("Error in handleRemove:", error);
        }
    };


    useEffect(() => {
        fetchCart();
    }, []);
    const cartTotal = items.reduce((total, item) => total + item.price, 0);
    return (
        <div className="cart-page-container">
            {items.length === 0 ? (
                // <p>Your cart is empty.</p>
                <div className="jesse">
                    <img src="https://cdn.discordapp.com/attachments/1012940768937267293/1306147590416498719/Screenshot_20241113_014407_Gallery.jpg?ex=6751f47c&is=6750a2fc&hm=04a570ebd637e68df1c2aa125adb3cce0aadd6dfb77441e78431f50912fe5ee2&"></img>
                </div>) : (
                <div class="container mt-5 p-3 rounded cart">
                    <div class="row no-gutters">

                        <div class="col-md-8 product-details mr-2" style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                        }}>
                            {items.map((item) => (
                                <div class="d-flex align-items-center mt-3 p-2 items rounded" key={item.id} style={{
                                    position: 'relative',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    padding: '10px',

                                    backgroundColor: '#f9f9f9',
                                }}>

                                    <button class="btn btn-transparent border-0" onClick={() => handleRemove(item.id)}
 >
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                    <img className="rounded" src={item.image} width="40" alt={item.title} />
                                    <span class="font-weight-bold" style={{ marginLeft: "20px", fontFamily: "Helvetica, sans-serif", flexGrow: 1 }}>{item.title}</span>
                                    <span className="font-weight-bold" style={{ fontFamily: "Helvetica, sans-serif", fontSize: '15px', marginLeft: 'auto' }}>${item.price}</span>

                                </div>
                            ))}
                        </div>

                        <div class="col-md-4">
                            <div class="payment-info p-3 rounded bg-info">
                                <h6>Order Summary</h6>
                                <hr />
                                <div class="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-between">
                                    <span>Total</span>
                                    <span>${cartTotal.toFixed(2)}</span>
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
