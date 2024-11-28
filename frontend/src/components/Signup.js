import "../css/style.css"
import "../css/css.css"
import {useState} from "react";


const Signup = ({isDark}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordDupe, setPasswordDupe] = useState("");


    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const res = await fetch("http://localhost:8080/register", {
                method : "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, passwordDupe})
            });

            handleResponse(await res.json());
        }catch (error){
            console.log("Registration failed: ", error);
        }

        setEmail("");
        setPassword("");
        setPasswordDupe("");
    }

    const handleResponse = (data) => {
        if("message" in data){
            window.location.href = "http://localhost:8080/"
            alert("Registered successfully! Please sign in with the credentials! :)")
        }else{
            return (
                alert(data.error)
            )
        }
    }

    return (
        <div className={`body-content ${isDark ? "dark-mode" : "light-mode"}`}>
            <div className={`sign-up-form ${isDark ? "dark-mode" : "light-mode"}`}>
                <h1> Sign Up </h1>
                <form>
                    <input type="email" className={`input-box ${isDark ? "dark-mode" : "light-mode"}`} placeholder="Your Email" value = {email} onChange = {e => setEmail(e.target.value)}/>
                    <input type="password" className={`input-box ${isDark ? "dark-mode" : "light-mode"}`} placeholder="Your Password" value = {password} onChange = {e => setPassword(e.target.value)}/>
                    <input type="password" className={`input-box ${isDark ? "dark-mode" : "light-mode"}`} placeholder="Confirm Password" value = {passwordDupe} onChange = {e => setPasswordDupe(e.target.value)}/>
                    <button type="button" className={`signup-btn auth-button ${isDark ? "dark-mode" : "light-mode"}`} onClick = {onSubmit}>Sign Up</button>
                    <p>Already have an account? <a href="/login">Log In</a> </p>
                </form>
            </div>
        </div>
    )
}
export default Signup;