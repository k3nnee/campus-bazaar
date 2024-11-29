import Unauthorized from "./Unauthorized";
import Upload from "./Upload";

const UploadPage = (prop) => {
    return (
        <>
            {prop.user ? <Upload user = {prop.user} isDark = {prop.isDark}/> : <Unauthorized message = "Please sign in to upload posts" isDark={prop.isDark}/>}
        </>
    )
}

export default UploadPage;