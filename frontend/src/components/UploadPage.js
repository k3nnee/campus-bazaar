import Unauthorized from "./Unauthorized";
import Upload from "./Upload";

const UploadPage = (prop) => {
    return (
        <>
            {prop.user ? <Upload user = {prop.user}/> : <Unauthorized message = "Please sign in to upload posts" />}
        </>
    )
}

export default UploadPage;