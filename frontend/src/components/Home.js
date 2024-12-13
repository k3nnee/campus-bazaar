import "../css/css.css";
import Unauthorized from "./Unauthorized";
import Body from "./Body";

const Home = (prop) => {
    return (
        <>
            {
                prop.user ? <Body isDark={prop.isDark} user={prop.user}/> : <Unauthorized message = "Please sign in to view contents" isDark={prop.isDark}/>
            }
        </>
    );
};
export default Home;

