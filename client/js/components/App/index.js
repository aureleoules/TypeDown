import React from 'react';
import {connect} from 'react-redux';
import store from '../../store';
import Navbar from '../Navbar';
import Footer from '../Footer/';
import {ConnectedRouter} from 'react-router-redux';
import {BrowserRouter, Switch, Route , Redirect} from 'react-router-dom'
import {push} from 'react-router-redux';
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Register from '../../containers/Register';
import NewDocument from '../../containers/NewDocument';
import Document from '../../containers/Document';
import Profile from '../../containers/Profile';
import NotFound from '../../components/NotFound';
import {bindActionCreators} from 'redux';
import {logoutUser} from '../../actions/userActions';
import {getUser} from '../../services/auth';

class App extends React.Component {

    requireAuth(Component) {
        if (localStorage.jwtToken) {
            return Component;
        }
        return <Redirect to='/login'/>;
    }

    noAuth(Component) {
        if(localStorage.jwtToken) {
            return <Redirect to='/'/>;
        }
        return Component;
    }

    componentDidMount() {
        const exp = getUser().exp;
        const time = Math.floor((new Date()).getTime()) / 1000;
        if(exp && exp !== undefined) {
            if(exp < time) {
                this.props.logoutUser();
            }
        }
    }

    render() {
        return(
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <div style={{height: '100%'}}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route render={() => this.noAuth(<Login/>)} exact path='/login'/>
                            <Route render={() => this.noAuth(<Register/>)} exact path='/register'/>
                            <Route component={NewDocument} exact path='/new'/>
                            <Route component={Document} exact path='/document/:id'/>
                            <Route component={Profile} exact path='/user/:username'/>

                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}

function mapStateToProps(state) {
    return {
        session: state.session
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({logoutUser}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);