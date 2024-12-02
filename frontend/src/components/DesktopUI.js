import InfiniteFlatList from "./InfiniteFlatList";
import Expanded from "./Expanded";

const DesktopUI = ({data, highlight, setHighlight, isDark}) => {
    return (
        <div className = {`container-fluid w-100 vh-100 mx-0 ${isDark ? "dark-mode" : "light-mode"}`}>
            <div className = "row">
                <div className = "col-4 d-flex justify-content-end mt-3">
                    <InfiniteFlatList setHighlight = {setHighlight} data = {data} isDark={isDark}/>
                </div>
                <div className = "col-8">
                    <div className = {`container-fluid h-100 d-flex justify-content-start mt-4 `}>
                        <div className = {`expand rounded-2 position-sticky z-3 w-100 ${isDark? "dark-mode" : "light-mode"}`}
                             style = {{width: "25rem", height: window.innerHeight*.825, top: "23px"}}>
                            {
                                highlight != null ? <div className = {`expanded-post container-fluid h-100 ${isDark ? "dark-mode" : "light-mode"}`}>
                                    <Expanded
                                        title={data[highlight].sanitized_title}
                                        price={data[highlight].parsed_price}
                                        email={data[highlight].email}
                                        description={data[highlight].sanitized_description}
                                        imageUrl={data[highlight].imageUrl}
                                        isDark={isDark}
                                    />
                                </div>
                                    :
                                    <div className = {`expanded-post container-fluid h-100 d-flex justify-content-center align-items-center ${isDark ? "dark-mode" : "light-mode"}`}>
                                        <h6>
                                            Click on a card to view it
                                        </h6>
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