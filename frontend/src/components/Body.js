import InfiniteFlatList from "./InfiniteFlatList";
import DesktopUI from "./DesktopUI";

const Body = () => {
    const windowDimension = window.innerWidth;
    console.log(windowDimension);
    return (
        <div>
            {
                windowDimension <= 1000 ? <InfiniteFlatList /> : <DesktopUI />
            }
        </div>
    )
}

export default Body;