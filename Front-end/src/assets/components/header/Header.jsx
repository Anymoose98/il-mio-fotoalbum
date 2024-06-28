import headerStyles from "./Header.module.scss"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={headerStyles.bgHeader} >
            <div className="container">
                <div className="row">
                    <div className="col-4">

                    </div>
                    <div className="col-4">
                        <h1 className="text-center p-2">Il mio foto album</h1>
                    </div>
                    <div className="col-4 text-end">
                        <button><Link to={`http://localhost:5173/login`}>Login</Link></button>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header;