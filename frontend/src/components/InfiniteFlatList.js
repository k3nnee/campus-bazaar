import Post from "./Post";

const InfiniteFlatList = ({data, setHighlight}) => {

    // const NoContent = () => {
    //     return (
    //         <>
    //             <div className = "m-5">
    //                 <h2> No items listed </h2>
    //             </div>
    //         </>
    //     )
    // }

    return (
        <div>
            <div className="container-fluid d-flex justify-content-center">
                <div className="d-flex flex-column">
                    {
                        data.map((item, index) => (
                            <div className="my-2" key={index}>
                                <Post
                                    title={item.sanitized_title}
                                    imageUrl={item.imageUrl}
                                    email={item.email}
                                    handleClick = {setHighlight}
                                    index = {index}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    
);
}

export default InfiniteFlatList;