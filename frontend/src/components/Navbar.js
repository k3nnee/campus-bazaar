import { Link } from "react-router-dom"
import NavbarLink from "./NavbarLink";
import {useEffect} from "react";

export default function Navbar({user, setUser}) {
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch("/getUser", {
                method : "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const user = await res.json();
            setUser(user.user);
        }

        getUser().then(() => console.log("User fetched"));
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
                <div className = "d-flex justify-content-between container-fluid">
                    <Link className="navbar-brand ms-2 ps-2 me-0 pe-0" style = {{color:"white"}} to="/">CAMPUS BAZAAR</Link>

                    <div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>

                <NavbarLink user = {user} styles = "container-fluid d-flex justify-content-end d-none d-lg-flex"/>
            </nav>

            <NavbarLink user = {user} styles = "collapse navbar-collapse pb-2 px-5"/>
        </>
    )
  }