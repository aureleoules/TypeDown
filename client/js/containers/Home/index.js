import React from 'react';
import Strings from '../../Strings';
import store from '../../store';
import {push} from 'react-router-redux';

class Home extends React.Component {
    render() {
        return(
            <section className="home-section">
                <div className="create-document-container">
                    <a onClick={() => store.dispatch(push("/new"))} className="animated pulse button is-large is-outlined is-light create-document-button">{Strings.createDocument}</a>
                </div>
            </section>
        )
    }
}

export default Home;