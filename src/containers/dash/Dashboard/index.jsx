import React from 'react'
import {connect} from 'react-redux'
import ShopStats from "../../shop/ShopStats";
import {updateTableShops} from "../../../actions/shops-action";

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.updateTableShops()
    }

    render() {
        const {updatedShops} = this.props
        const {shops} = updatedShops

        return (
            <div>
                {
                    updatedShops && shops.map(shop => (
                        <ShopStats key={shop.id} shopId={shop.id} title={shop.name}/>
                    ))
                }
            </div>
            /*<Grid container spacing={3}>
                {/!* Recent Deposits *!/}
                <Grid item xs={12} md={4} lg={3}>
                    <Paper>
                        {/!*<Deposits />*!/}

                    </Paper>

                </Grid>
            </Grid>*/
        )
    }
}

const mapStateToProps = (state) => ({
    updatedShops: state.shops.updatedShops
})

const mapDispatchToProps = {updateTableShops}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)