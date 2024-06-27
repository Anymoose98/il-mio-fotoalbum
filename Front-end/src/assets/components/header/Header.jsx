import headerStyles from "./Header.module.scss"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={headerStyles.bgHeader} >
            <h1 className="text-center p-2">Il mio foto album</h1>
        </header>
    )
}

export default Header;