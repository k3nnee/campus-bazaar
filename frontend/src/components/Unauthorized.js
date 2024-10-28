import Signin from "./Signin";

const Unauthorized = (prop) => {
    return (
        <>
            <Signin message = {prop.message}/>
        </>
    )
}

export default Unauthorized;