import Unauthorized from "./Unauthorized";
import Profile from "./Profile";

const ProfilePage = (prop) => {
    return (
        <>
            {prop.user ? <Profile user = {prop.user}/> : <Unauthorized message = "Please sign in to upload profile picture" />}
        </>
    )
}

export default ProfilePage;