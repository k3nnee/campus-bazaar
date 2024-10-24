import "../css/style.css"
import {useState} from "react";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/register", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            handleResponse(await res.json());
        }catch (error){
            console.log("Registration failed: ", error);
        }

        setEmail("");
        setPassword("");
    }

    const handleResponse = async (data) => {
        if("message" in data){
            window.location.href = "http://localhost:3000/"
            alert("Registered successfully! Please sign in with the credentials! :)")
        }else{
            return (
                alert(data.error)
            )
        }
    }

    return (
        <>
            <div className="sign-up-form">
                <h1> Sign Up </h1>
                <form>
                    <input type="email" className="input-box" placeholder="Your Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <input type="password" className="input-box" placeholder="Your Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                    <button type="button" className="signup-btn auth-button" onClick = {onSubmit}>Sign Up</button>
                    <p>Already have an account? <a href="/login">Log In</a> </p>
                </form>
            </div>
        </>
    )
}
export default Signup;