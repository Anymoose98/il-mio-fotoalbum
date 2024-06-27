import footerStyles from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={footerStyles.bgFooter}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Footer</h1>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;