import "../css/css.css";
import Unauthorized from "./Unauthorized";
import Body from "./Body";

const Home = (prop) => {
    return (
        <>
            {
                prop.user ? <Body /> : <Unauthorized message = "Please sign in to view contents"/>
            }
        </>
    );
};
export default Home;

