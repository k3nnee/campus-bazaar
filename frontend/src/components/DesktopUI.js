import InfiniteFlatList from "./InfiniteFlatList";

const DesktopUI = () => {
    return (
        <div className = "container-fluid w-100 vh-100 mx-0">
            <div className = "row">
                <div className = "col-4 d-flex justify-content-end mt-3">
                    <InfiniteFlatList />
                </div>
                <div className = "col-8">
                    <div className = "container-fluid h-100 d-flex justify-content-start mt-4">
                        <div className = "rounded-2 position-sticky z-1 opacity-50 w-100"
                             style = {{width: "25rem", height: window.innerHeight*.825, top: "53px", border: "1px solid", borderColor: "rgb(200,200,200)"}}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DesktopUI;