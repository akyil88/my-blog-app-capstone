import {Link} from "react-router-dom";
import "../Header/Header.css";
import HomeButtonLogo from "../Images/Homebutton.png";
import  {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {FaBars} from "react-icons/fa";


function Header() {

    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

    const closeNavHandler = () => {
       if(window.innerWidth < 800) {
           setIsNavShowing(false);
       } else {
           setIsNavShowing(true)
       }
    }
    return (
        <nav>
            <div className="container nav_container">
            <Link to="/" className="nav_logo" onClick={closeNavHandler}><img src={HomeButtonLogo} alt="Navbar Logo"/></Link>

                {isNavShowing && <ul className="nav_menu">
                <li><Link to="/profile" onClick={closeNavHandler}>Gökhan Akyil</Link></li>
                <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
                <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
            </ul>}
            <button className="nav_toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
                {isNavShowing ? <AiOutlineClose/>: <FaBars/>}
            </button>

            </div>
        </nav>
    )
}

export default Header;
