import Signin from "./Signin";

const Unauthorized = (prop) => {
    return (
        <>
            <Signin message = {prop.message} isDark={prop.isDark}/>
        </>
    )
}

export default Unauthorized;