import React from 'react';
import {connect} from 'react-redux';
import store from '../../store';
import Navbar from '../Navbar';
import Footer from '../Footer/';
import history from '../../history';
import {ConnectedRouter} from 'react-router-redux';
import { Route , Redirect} from 'react-router'
import {push} from 'react-router-redux';
import Home from '../../containers/Home';
import Login from '../../containers/Login';
import Register from '../../containers/Register';
import NewDocument from '../../containers/NewDocument';
import navRoutes from './navRoutes';
import dropdownRoutes from './dropdownRoutes';
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
            <div>
                <Navbar userDropdownItems={dropdownRoutes} items={navRoutes}/>
                <ConnectedRouter history={history}>
                    <div style={{height: '100%'}}>
                        <Route exact path='/' component={Home}/>
                        <Route render={() => this.noAuth(<Login/>)} exact path='/login'/>
                        <Route render={() => this.noAuth(<Register/>)} exact path='/register'/>
                        <Route render={() => this.noAuth(<NewDocument/>)} exact path='/new'/>
                    </div>
                </ConnectedRouter>
                {/* <Footer/> */}
            </div>
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