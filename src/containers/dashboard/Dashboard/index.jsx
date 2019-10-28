import React from 'react'
import {connect} from 'react-redux'
import ShopStats from "../../shop/ShopStats";
import {updateTableShops} from "../../../actions/shops-action";
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
        this.props.updateTableShops()
        const {role} = this.props.login

        if (role === PARTNER) {
            
        }
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
        )
    }
}

const mapStateToProps = (state) => ({
    updatedShops: state.shops.updatedShops,
    login: state.login
})

const mapDispatchToProps = {updateTableShops}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
