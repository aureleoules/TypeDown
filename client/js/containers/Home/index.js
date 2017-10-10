import React from 'react';
import Strings from '../../Strings';
import store from '../../store';
import {push} from 'react-router-redux';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return(
            <section className="home-section">
                <div className="create-document-container">
                    <Link to="/new" className="animated flipInX button is-large is-outlined is-light create-document-button">{Strings.createDocument}</Link>
                </div>
            </section>
        )
    }
}

export default Home;