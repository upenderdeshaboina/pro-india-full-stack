import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext" 
import './index.css'
import { Link } from "react-router-dom";

const Navbar=()=>{
    const {logout}=useContext(AuthContext);
    
    const onClickLogout=()=>{
        logout()
    }
    return(
        <nav className="nav-bar">
            <h2>Pro India</h2>
            <Link to='/'>
              <button type="button" onClick={onClickLogout}>Log out</button> 
            </Link>
        </nav>
        
    )
}
export default Navbar