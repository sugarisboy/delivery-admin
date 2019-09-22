import React from 'react'
import LoginPage from '../LoginPage'
import { Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'

class App extends React.Component {

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

export default connect(mapStateToProps)(App)