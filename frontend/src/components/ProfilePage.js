import Unauthorized from "./Unauthorized";
import Profile from "./Profile";

const ProfilePage = (prop) => {
    return (
        <>
            {prop.user ? <Profile user = {prop.user} isdark={isdark}/> : <Unauthorized message = "Please sign in to upload profile picture" isDark={prop.isDark}/>}
        </>
    )
}

export default ProfilePage;