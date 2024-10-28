const Logout = ({email}) => {
    const handleLogout = async () => {
        console.log(email);
        try {
            const res = await fetch("http://localhost:8080/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email}),
                credentials: "include"
            });
            const data = await res.json();
            if (res.ok) {
                handleResponse(data);
            }
        } catch (error){
            console.log("Error logging out");
        }
    };

    const handleResponse = (data) => {
        if("message" in data){
            alert("Logged out successfully")
            window.location.href = "http://localhost:8080/"
        }else{
            return (
                alert(data.error)
            )
        }
    }

    return (
        <div>
            <p className = "btn my-0 py-0" onClick={handleLogout}>Logout</p>
        </div>
    );
};
export default Logout;