import "../css/style.css"

const Signup = () => {
    return (
        <>
            <div className="sign-up-form">
                <h1> Sign Up Now</h1>
                <form>
                    <input type="email" className="input-box" placeholder="Your Email" />
                    <input type="password" className="input-box" placeholder="Your Password" />
                    <button type="button" className="signup-btn">Sign Up</button>
                    <p>Already have an account? <a href="">Log In</a> </p>
                </form>
            </div>
        </>
    )
}
export default Signup;