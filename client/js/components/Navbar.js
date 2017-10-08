import React from 'react';
import { Link } from 'react-router-dom'
import store from '../store';
import {push} from 'react-router-redux';
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

    getItems = () => {
        return this.props.items.map((item, i) => {
            const icon = `icon-r fa fa-${item.icon}`;
            if((!item.requireSession) || (item.requireSession && this.props.session.isAuth)) {
                return (
                    <a key={item.title} onClick={() => store.dispatch(push(item.route))} className="navbar-item">
                        <span className="icon">
                            <i className={icon}></i>
                        </span>
                        {item.title}
                    </a>
                );
            }
        });
    }
    getLocation = () => {
        if(this.props.router.location) {
            return this.props.router.location.pathname;
        }
        return null;
    }

    getUserDropdownItems = () => {
        return this.props.userDropdownItems.map((item, i) => {
            if(item.divider) {
                return <hr key={i} className="navbar-divider"/>;
            }
            const icon = `icon-r fa fa-${item.icon}`;
            return (
                <a key={i} className={`navbar-item ${this.getLocation() === item.route ? "is-active" : ""}`} onClick={() => store.dispatch(push(item.route))} >
                    <div className="has-text-centered">
                        <span className="icon">
                            <i className={icon}></i>
                        </span>
                        {item.title}
                    </div>
                </a>
            );
        });
    }

    render() {
        return(
            <nav className="navbar is-transparent">
                <div className="navbar-brand">
                    <a onClick={() => store.dispatch(push("/"))} className="navbar-item" href="#">
                        <h1 className="has-white brand title">TypeDown.fr</h1>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        {!this.props.session.isAuth &&
                            <div className="navbar-item">
                                <div className="field is-grouped">
                                    <p className="control">
                                        <a onClick={() => store.dispatch(push("/login"))} className="button is-light is-outlined">
                                            {Strings.login}
                                        </a>
                                    </p>
                                    <p className="control">
                                        <a onClick={() => store.dispatch(push("/register"))} className="button is-light">
                                        {Strings.register}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        }
                        {this.props.session.isAuth && 
                            <div onMouseEnter={() => this.setState({showDropdown: true})} onClick={() => this.setState({showDropdown: !this.state.showDropdown})} onMouseLeave={() => this.setState({showDropdown: false})} className={`navbar-item has-dropdown ${this.state.showDropdown ? 'is-active' : ''}`}>
                                <a className='navbar-link'>
                                {getUser().username}
                                </a>
                                <div className="user-dropdown navbar-dropdown">
                                    {this.getUserDropdownItems()}
                                    <hr className="navbar-divider"/>
                                    <div className="navbar-item">
                                        <p className="control width-100">
                                            <a onClick={() => this.props.logoutUser()} className="width-100 button is-danger logout">
                                                {Strings.logout}
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
