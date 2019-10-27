import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Deposits from '../Deposits'
import React from 'react'
import { connect } from 'react-redux'
import ShopStats from "../../shop/ShopStats";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Grid container spacing={3}>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper>
                        {/*<Deposits />*/}

                    </Paper>

                    <ShopStats shopId={6}/>

                </Grid>
            </Grid>
        )
    }
}

export default connect()(Dashboard)