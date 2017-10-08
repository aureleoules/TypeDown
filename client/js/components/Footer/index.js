import React from 'react';
import Strings from '../../Strings';

class Footer extends React.Component {
    render() {
        return(
            <footer className="footer">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>
                            Copyright © 2017, <b>{Strings.appName}</b> by <a href="http://aurele.oules.com" target="_blank">Aurèle Oulès</a>
                        </p>
                        <ul className="site-footer-links">
                            <li><a>Privacy</a></li>
                            <span>&#8226;</span>
                            <li><a>Terms</a></li>
                            <span>&#8226;</span>
                            <li><a>Help</a></li>
                            <span>&#8226;</span>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;