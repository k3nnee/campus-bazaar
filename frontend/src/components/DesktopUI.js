import InfiniteFlatList from "./InfiniteFlatList";
import Expanded from "./Expanded";

const DesktopUI = ({data, highlight, setHighlight}) => {
    return (
        <div className = "container-fluid w-100 vh-100 mx-0">
            <div className = "row">
                <div className = "col-4 d-flex justify-content-end mt-3">
                    <InfiniteFlatList setHighlight = {setHighlight} data = {data}/>
                </div>
                <div className = "col-8">
                    <div className = "container-fluid h-100 d-flex justify-content-start mt-4">
                        <div className = "rounded-2 position-sticky z-1 w-100"
                             style = {{width: "25rem", height: window.innerHeight*.825, top: "53px", border: "1px solid", borderColor: "rgb(210,210,210)"}}>
                            {
                                highlight != null && <div className = "container-fluid h-100">
                                    <Expanded
                                        title={data[highlight].sanitized_title}
                                        price={data[highlight].parsed_price}
                                        email={data[highlight].email}
                                        description={data[highlight].sanitized_description}
                                        imageUrl={data[highlight].imageUrl}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DesktopUI;