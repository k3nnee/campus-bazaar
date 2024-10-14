import "../style.css"

const Signin = () => {
    return (
        <>
            <div className="log-in-form">
                <h1> Log In With</h1>
                <form>
                    <input type="email" className="input-box" placeholder="Your Email" />
                    <input type="password" className="input-box" placeholder="Your Password" />
                    <button type="button" className="login-btn">Log In</button>
                    <p>Don't Have an Account? <a href="">Sign Up</a></p>
                </form>
            </div>
        </>
    )
}

export default Signin;