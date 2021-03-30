import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import AuthServices from '../services/AuthServices'
import { AuthContext } from '../context/AuthContext'

const Navbar = (props) => {
    const {isAuthenticated,user,setIsAuthenticated,setUser} = useContext(AuthContext);

    const logoutHandler = () => {
        AuthServices.logout().then((data) => {
            if(data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }

    const unAuthenticatedNavbar = () => {
        return(
            <>
                {/* <div className="navbar">
                    <div className="container">
                        <div className="nav_content"> */}
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                        {/* </div>
                    </div>
                </div> */}
            </>
        )
    }

    const authenticatedNavbar = () => {
        return(
            <>
                {/* <div className="navbar">
                    <div className="container">
                        <div className="nav_content"> */}
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/todo">Todos</Link></li>
                                {
                                    user.role === "admin" ? 
                                    <li><Link to="/admin">Admin</Link></li> : 
                                    null
                                }
                                <button className="logout_btn" onClick={logoutHandler}>Logout</button>
                            </ul>
                        {/* </div>
                    </div>
                </div> */}
            </>
        )
    }
    return (
        <div>
            <div className="navbar">
                <div className="container">
                    <div className="nav_content">
                        <Link to="/"><h2>Todoiesta</h2></Link>
                        {!isAuthenticated ? unAuthenticatedNavbar() : authenticatedNavbar()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
