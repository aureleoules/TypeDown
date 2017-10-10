import React from 'react';
import { Link } from 'react-router-dom'
import {isAuthenticated} from '../services/auth';
import {connect} from 'react-redux';
import {logoutUser} from '../actions/userActions';
import {bindActionCreators} from 'redux';
import Strings from '../Strings';
import {getUser} from '../services/auth';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }
    }
    getLocation = () => {
        if(this.props.router.location) {
            return this.props.router.location.pathname;
        }
        return null;
    }
    
    render() {
        return(
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <h1 className="has-white brand title">TypeDown.fr</h1>
                    </Link>
                    <button onClick={() => document.querySelector('.navbar-menu').classList.toggle('is-active')} className="navbar-burger burger" data-target="navMenuExample">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        {!this.props.session.isAuth &&
                            <div className="navbar-item">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <Link to="/login" className="button is-light is-outlined">
                                            {Strings.login}
                                        </Link>
                                    </p>
                                    <p className="control">
                                        <Link to="/register" className="button is-light">
                                            {Strings.register}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        }
                        {this.props.session.isAuth && 
                            <div onMouseEnter={() => this.setState({showDropdown: true})} onClick={() => this.setState({showDropdown: !this.state.showDropdown})} onMouseLeave={() => this.setState({showDropdown: false})} className={`navbar-item is-right has-dropdown ${this.state.showDropdown ? 'is-active' : ''}`}>
                                <a className='navbar-link navbar-username'>
                                    {getUser().username}
                                </a>
                                <div className="user-dropdown is-right navbar-dropdown">
                                    <Link to={`/user/${getUser().username}`} className="dropdown-item">
                                        <i className="icon fa fa-user"></i>
                                        {Strings.profile}
                                    </Link>
                                    <hr className="navbar-divider"/>
                                    <div className="navbar-item">
                                        <p className="control width-100">
                                            <a onClick={() => this.props.logoutUser()} className="width-100 button is-danger logout">
                                                {Strings.logOut}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state, ownProps) {  
  return {session: state.session, router: state.router};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar);
