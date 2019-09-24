import React from 'react'
import LoginPage from '../LoginPage'
import { Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { failLogin, successLogin } from '../../actions/login-actions'
import moment from 'moment'

class App extends React.Component {

    constructor(props) {
        super(props)

        this.checkAuth()
    }

    checkAuth() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.props.failLogin()
        } else {
            const tokenData = parseJwt(token)
            const now = moment()
            const expDate = moment(tokenData.exp * 1000)

            if (expDate.isAfter(now)) {
                this.props.successLogin()
            } else {
                this.props.failLogin()
            }
        }

        function parseJwt(token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url
                .replace(/-/g, '+')
                .replace(/_/g, '/')

            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => ('%'
                                + (
                                    '00' + c.charCodeAt(0).toString(16)
                                ).slice(-2)).join(''))
            )

            return JSON.parse(jsonPayload);
        }
    }

    render() {
        return (
            <div>
                <Route path="/admin/">
                    { this.props.isLoggedIn ? <Dashboard/> : <LoginPage/> }
                </Route>
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
        successLogin: () => dispatch(successLogin()),
        failLogin: () => dispatch(failLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)