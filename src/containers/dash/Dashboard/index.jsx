import Grid from '@material-ui/core/Grid'
import React from 'react'
import { connect } from 'react-redux'
import ShopStats from '../../shop/ShopStats'
import { PARTNER } from '../../../service/roles'

class Dashboard extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            shops: []
        }
    }

    componentDidMount() {
        const {role} = this.props.login

        if (role === PARTNER) {
            
        }
    }

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                    <ShopStats shopId={6}/>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps)(Dashboard)