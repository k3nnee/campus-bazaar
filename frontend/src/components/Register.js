import { useState } from "react";

function Register(){
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (event) =>{
        event.preventDefault();
    
        try{
            const res = await fetch("http://localhost:8080/register", {
                method : "POST",
                body: {userName, email, password}
            });
            console.log("User registered: ", res.data) 
        }catch (error){
            console.log("Registration failed", error);
    
        }
    };

    return(
        <form onSubmit={submit}>
            <label>
                Email:
                <input type = "email" value = {email} onChange = {e => setEmail(e.target.value)} />
            </label>
            <label>
                Username:
                <input type = "text" value = {userName} onChange = {e => setUserName(e.target.value)} />
            </label>
            <label>
                Password:
                <input type = "password" value = {password} onChange = {e => setPassword(e.target.value)} />
            </label>
            <button type = "submit">Register</button>
        </form>
    );
}

export default Register;

