import "../css/style.css"
import {useState} from "react";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/login", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
                credentials: "include"
            });
            console.log("User registered: ", res.data)
        }catch (error){
            console.log("Registration failed", error);
        }

        setEmail("");
        setPassword("");
    }

    return (
        <>
            <div className="log-in-form">
                <h1> Log In </h1>
                <form>
                    <input type="email" className="input-box" placeholder="Your Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <input type="password" className="input-box" placeholder="Your Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                    <button type="button" className="signup-btn" onClick = {onSubmit}>Sign In</button>
                    <p>Don't have an account? <a href="/register">Sign up</a> </p>
                </form>
            </div>
        </>
    )
}

export default Signin;