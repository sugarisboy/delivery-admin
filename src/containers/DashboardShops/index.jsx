import React from 'react'
import ShopList from '../ShopList'
import {Route} from 'react-router-dom'
import ShopCreatePopup from "../ShopCreatePopup";

class DashboardShops extends React.Component {
    render() {
        const {match} = this.props

        return (
            <React.Fragment>

                <ShopList match={match}/>

                <div>
                    <Route path={`${match.url}/create`} exact component={ShopCreatePopup}/>
                </div>
            </React.Fragment>
        )
    }
}

export default DashboardShops