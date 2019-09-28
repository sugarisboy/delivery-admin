import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Deposits from '../Deposits'
import DashboardOrders from '../DashboardOrders'
import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.classes = makeStyles(theme => ({
            paper: {
                padding: theme.spacing(2),
                    display: 'flex',
                    overflow: 'auto',
                    flexDirection: 'column'
            },
        }))
    }


    render() {
        return (
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                    <Paper className={this.fixedHeightPaper}>
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className={this.fixedHeightPaper}>
                        <Deposits />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={this.classes.paper}>
                        {/*<DashboardOrders />*/}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default connect()(Dashboard)