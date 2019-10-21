import React from 'react'
import LoginPage from '../LoginPage'
import AdminPanel from '../AdminPanel'
import {connect} from 'react-redux'
import {checkAuth} from '../../actions/login-actions'
import {BrowserRouter} from 'react-router-dom'
import SnackbarTree from "../SnackbarTree";

class App extends React.Component {

    constructor(props) {
        super(props)
        this.props.checkAuth()
    }

    render() {

        return (
            <BrowserRouter basename="/admin">
                <React.Fragment>
                    { this.props.isLoggedIn ? <AdminPanel/> : <LoginPage/> }
                    <SnackbarTree/>
                </React.Fragment>
            </BrowserRouter>
        )
    }

}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.login.isLoggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        checkAuth: () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)