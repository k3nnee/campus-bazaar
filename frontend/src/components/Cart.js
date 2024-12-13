import { useEffect, useState } from "react";
import "../css/css.css";

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QVNSTRwkgvEbIsRqJX6GbN973sOHhGvOQ4TYRUTfAgQPiTxGdhWEyJYGWxPlU4dhJtOtBrHEcb9H19dSfne0uW100eiyvJOW7');

const Cart = () => {
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

    const handleCartUpdate = async (id) => {
        try {
            const response = await fetch('/updateCart', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, action: 'remove' })
            });

            if (response.ok) {
                fetchCart(); 
                window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { id, action: 'remove' } }));
                console.log('cartUpdated event dispatched for item:', id);
            } else {
                console.error("Failed to update the cart");
            }
        } catch (error) {
            console.error("Error updating the cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const cartTotal = items.reduce((total, item) => total + item.price, 0);

    const handleCheckout = async () => {
        const response = await fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({items: items.map(item => ({
                id: item.id,
                name: item.title,
                price: item.price
            }))
        }),});
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url; 
        } else {
            alert(data.message);
            console.error('Failed to start the checkout process.');
        }
    };

    // for clearing cart  after checkout
    useEffect(() => {
        window.addEventListener('load', () => {
            if (new URLSearchParams(window.location.search).has('session_id')) {
                setItems([]); 
            }
        });
    }, []);

   console.log('items: ', items);

    return (
        <div className={`body-conten d-flex justify-content-center`}>
        {/* <div className="cart-page-container"> */}
            {items.length === 0 ? (
                <div className="no-item h-50 m-3 p-3 d-flex justify-content-center">
                    <h3>No Items In Cart  (｡ •́︿•̀｡ ) </h3>
                </div>) : (
                <div class="container mt-5 p-3 rounded cart">
                    <div class="row no-gutters">

                        <div class="col-md-8 product-details mr-2" style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                            border: '1.5px solid rgb(210,210,210)',
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            {items.map((item) => (
                                <div class="d-flex align-items-center p-3 items rounded" key={item.id} style={{
                                    position: 'relative'
                                }}>

                                    <img className="rounded p-3" src={item.image} style={{ cornerRadius: '10px', height: 135, width: 135, objectFit: 'cover' }} alt={item.title} />
                                    <div className="d-flex justify-content-start flex-column p-0 ms-3 mt-3">
                                        <h5 className="pb-3" style={{fontFamily: "Helvetica, sans-serif", flexGrow: 1, fontWeight: 'bold'}}>{item.title}</h5>
                                        <p style={{fontFamily: "Helvetica, sans-serif", flexGrow: 1 , fontWeight: 'lighter', fontSize:  '0.875em'}}>Sold by: {item.email}</p>
                                    </div>
                                    <h7 className="font-weight-bold p-1" style={{ fontFamily: "Helvetica, sans-serif", fontSize: '15px', marginLeft: 'auto' }}>$ {item.price.toFixed(2)}</h7>
                                    
                                    <span>
                                        <button className="btn btn-transparent ps-5 border-0" onClick={() => handleCartUpdate(item.id)} >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </span>

                                </div>
                            ))}
                        </div>

                        <div class="col-md-4 ps-3" style={{
                            border: '1.5px solid rgb(210,210,210)',
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div class="payment-info p-3 rounded">
                                <h4 className="p-2">Order Summary</h4>
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
                                <button class="btn btn-primary btn-block mt-3" onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>


            )}
        </div>
        // </div>
    );
};

export default Cart;
