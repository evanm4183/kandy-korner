import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localUser = JSON.parse(localStorage.getItem("kandy_user"))

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link " to="/">Home</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link " to="/locations">Locations</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link " to="/products">Products</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link " to="/search">Find Candy</Link>
            </li>
            {
                localUser.staff
                ?
                    <li className="navbar__item">
                        <Link className="navbar__link " to="/employees">Employees</Link>
                    </li>
                : ""
            }
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

