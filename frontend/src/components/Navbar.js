import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light rounded-bottom navbar-custom">
            <Link className="navbar-brand" to="/">CAMPUS BAZAAR</Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <form className="form-inline">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                            Search
                        </button>
                    </form>

                    <li className="nav-item">
                        <Link className="nav-link" to="/user_upload">
                            Sell
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/*    <Link className="nav-link" to="/">*/}
                    {/*        Home*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notifications">
                            <i className="fa-sharp fa-solid fa-bell"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }
  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }