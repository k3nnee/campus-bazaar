import {Link} from "react-router-dom";

const NavbarLink = (prop) => {
    return (
        <div className={prop.styles} id="navbarToggleExternalContent" style = {{backgroundColor: "#063761"}}>
            <ul className="navbar-nav">
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/user_upload">
                        Sell
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/register">
                        Register
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/notifications">
                        <i className="fa-sharp fa-solid fa-bell"></i>
                    </Link>
                </li>

                <form className="d-flex" role="search">
                    <input className="form-control mx-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit"> Search </button>
                </form>
            </ul>
        </div>
    )
}

export default NavbarLink;