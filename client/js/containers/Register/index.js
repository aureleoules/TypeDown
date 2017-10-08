import React from 'react';
import {connect} from 'react-redux';
import store from '../../store';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {registerUser} from '../../actions/userActions';
import Strings from '../../Strings';
import MDSpinner from "react-md-spinner";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }
    
    getButtonText = () => {
        if(this.props.registration.registering) {
            return (<MDSpinner size={18} singleColor="#fafafa"/>);
        } else if(this.props.registration.registered) {
            return Strings.registerSuccess;
        }       
        return Strings.create;
    }

    register = () => {
        this.props.registerUser(this.state.username, this.state.email, this.state.password);
    }

    render() {
        return(
            <div className="login-container hero is-fullheight" style={{backgroundColor: "#2f3241"}}>
                <div className='login-page animated flipInY'>
                    <div className="login-page-form">
                        <form className="register-form">
                            <input onChange={username => this.setState({username: username.target.value})} type="text" placeholder={Strings.username}/>
                            <input onChange={email => this.setState({email: email.target.value})} type="text" placeholder={Strings.email}/>
                            <input onChange={password => this.setState({password: password.target.value})} type="password" placeholder={Strings.password}/>

                            <a 
                                className={this.props.registration.registered ? "login-button disabled" : "login-button" }
                                onClick={() => this.register()}>
                                {this.getButtonText()}
                            </a>

                            <p className="login-message">{Strings.alreadyRegistered} <a onClick={() => store.dispatch(push("/login"))}>{Strings.login}</a></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        registration: state.registration
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({registerUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);