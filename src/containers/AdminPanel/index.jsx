import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Dashboard from '../Dashboard'
import DashboardOrders from '../DashboardOrders'
import Bar from '../Bar'
import MenuPanel from '../MenuPanel'
import { withStyles } from '@material-ui/core'

const styles = {
    root: {
        display: 'flex'
    }
}

class AdminPanel extends React.Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Bar/>
                <MenuPanel/>
                <main>
                    <div/>
                    <Container maxWidth="lg">
                        <Switch>
                            <Route exact path='/'>
                                <Dashboard/>
                            </Route>
                            <Route path='/orders'>
                                <DashboardOrders/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </React.Fragment>
        );
    }

}

export default connect()(withStyles(styles)(AdminPanel))