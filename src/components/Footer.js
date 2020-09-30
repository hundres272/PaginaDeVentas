import React from 'react';
import './styles/footer.css';

function Footer () {
    return (
        <footer>
            <h2>COMPONENTES</h2>
            <div>
                <p>
                    Página web de muestra
                </p>
                <p>
                    Desarrollada por <a href="https://hundres.co/" id="page-hundres">hundres.co</a>
                </p>
            </div>
            <div className="social-images">
                <img src={process.env.PUBLIC_URL+"/images/facebook.png"} alt="icon-facebook" />
                <img src={process.env.PUBLIC_URL+"/images/instagram.png"} alt="icon-instagram" />
                <img src={process.env.PUBLIC_URL+"/images/whatsapp.png"} alt="icon-whatsapp" />
            </div>
        </footer>
    )
}

export default Footer;