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

const styles = theme => ({
    root: {
        display: 'flex'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginLeft: 167
    },
    spacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }
})

class AdminPanel extends React.Component {

    render() {
        const {classes} = this.props

        return (
            <React.Fragment>
                <CssBaseline />
                <Bar/>
                <MenuPanel/>
                <main className={classes.content}>
                    <div className={classes.spacer}/>
                    <Container maxWidth="lg" className={classes.container}>
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