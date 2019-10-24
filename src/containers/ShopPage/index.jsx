import React, {Component} from 'react'
import ShopMap from '../ShopMap'
import ShopForm from '../ShopForm'

class ShopPage extends Component {

    render() {
        const {shopId} = this.props.match.params

        return (
            <div>
                <ShopForm id={shopId}/>
                <ShopMap/>
            </div>
        )
    }

}

export default ShopPage