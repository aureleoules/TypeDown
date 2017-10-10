import React from 'react';
import store from '../../store';
import {push} from 'react-router-redux';
import Strings from '../../Strings';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../actions/userActions';
import {connect} from 'react-redux';
import {setToken} from '../../services/auth';
import MDSpinner from "react-md-spinner";
import {sleep} from '../../utils';
import { Redirect} from 'react-router'
import {Link} from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    login = () => {
        this.props.authenticateUser(this.state.username, this.state.password);
    }
    
    getButtonText = () => {
        if(this.props.authentication.authenticating) {
            return (<MDSpinner size={18} singleColor="#fafafa"/>);
        } else if(this.props.authentication.authenticated) {
            return Strings.loginSuccess;
        }
        return Strings.login;
    }

    render() {
        return(
            <div className="login-container is-fullheight hero" style={{backgroundColor: "#2f3241"}}>
                <div id="login-form" className='login-page animated flipInY'>
                    <div className="login-page-form">
                        <form className="login-form">
                            <input onChange={txt => this.setState({username: txt.target.value})} type="text" placeholder={Strings.username}/>
                            <input onChange={txt => this.setState({password: txt.target.value})} type="password" placeholder={Strings.password}/>
                            <a 
                                className={this.props.authentication.authenticated ? "login-button disabled" : "login-button"}
                                onClick={() => this.login()}>
                                {this.getButtonText()}
                            </a>       
                            {this.props.authentication.error &&
                                <p style={{color: "#ff3860"}} className="login-message">{Strings.loginError}</p>                     
                            }
                            <p className="login-message">{Strings.notRegistered} <Link to="/register">{Strings.createAccount}</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({authenticateUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);