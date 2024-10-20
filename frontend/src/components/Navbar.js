import { Link, useMatch, useResolvedPath } from "react-router-dom"
import NavbarLink from "./NavbarLink";

export default function Navbar() {
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

                <NavbarLink styles = "container-fluid d-flex justify-content-end d-none d-lg-flex"/>
            </nav>

            <NavbarLink styles = "collapse navbar-collapse pb-2 px-5"/>
        </>
    )
  }

  // function CustomLink({ to, children, ...props }) {
  //   const resolvedPath = useResolvedPath(to)
  //   const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  //
  //   return (
  //     <li className={isActive ? "active" : ""}>
  //       <Link to={to} {...props}>
  //         {children}
  //       </Link>
  //     </li>
  //   )
  // }