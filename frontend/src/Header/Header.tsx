import "../Header/Header.css";
import HomeButtonLogo from "../Images/Homebutton.png";
import {Link} from "react-router-dom";

type HeaderProps = {
    onCreateBlog?: () => void; // Optional, da nicht immer benötigt
};

const Header: React.FC<HeaderProps> = ({onCreateBlog}) => {
    return (
        <nav>
            <div className="container nav_container">
                <Link to="/" className="nav_logo">
                    <img src={HomeButtonLogo} alt="Navbar Logo"/>
                </Link>
                <ul className="nav_menu">
                    <li><Link to="/profile">Gökhan Akyil</Link></li>
                    {onCreateBlog && (
                        <li><Link to="/create" onClick={onCreateBlog}>Create Post</Link></li>
                    )}
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
