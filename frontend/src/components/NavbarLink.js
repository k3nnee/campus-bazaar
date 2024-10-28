import {Link} from "react-router-dom";
import Logout from "./Logout";

const NavbarLink = (prop) => {
    return (
        <div className={prop.styles} id="navbarToggleExternalContent" style = {{backgroundColor: "#063761"}}>
            <ul className="navbar-nav">
                <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                    <Link className="nav-link m-0 mx-1" to="/user_upload">
                        Sell
                    </Link>
                </li>
                {
                    prop.user == null ?
                    <>
                        <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                            <Link className="nav-link m-0 mx-1" to="/register">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                            <Link className="nav-link m-0 mx-1" to="/login">
                                Login
                            </Link>
                        </li>
                    </> :
                        <>
                            <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                                <Link className="nav-link m-0 mx-1" to="/cart">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Link>
                            </li>
                            <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                                <Link className="nav-link m-0 mx-1" to="/notifications">
                                    <i className="fa-sharp fa-solid fa-bell"></i>
                                </Link>
                            </li>
                            <li className="nav-item d-flex justify-content-center mt-2 mb-1">
                                <div className="dropdown">
                                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {prop.user}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className = "dropdown-item"><Logout email={prop.user}></Logout></li>
                                    </ul>
                                </div>
                            </li>
                        </>

                }
                <div className="container-fluid d-flex justify-content-center my-1">
                    <form className="d-flex" style = {{width: "20rem"}} role="search">
                        <input className="form-control mx-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit"> Search </button>
                    </form>
                </div>
            </ul>
        </div>
    )
}

export default NavbarLink;