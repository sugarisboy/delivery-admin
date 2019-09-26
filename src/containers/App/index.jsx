import React from 'react'
import LoginPage from '../LoginPage'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { checkAuth } from '../../actions/login-actions'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.props.checkAuth()
    }

    render() {

        return (
            <div>
                <Switch>
                    { this.props.isLoggedIn ? <Dashboard/> : <LoginPage/> }
                </Switch>
            </div>
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