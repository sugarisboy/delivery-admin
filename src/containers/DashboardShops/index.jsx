import React from 'react'
import ShopList from '../ShopList'
import Button from '@material-ui/core/Button'
import {Link, Route} from 'react-router-dom'
import ShopCreatePopup from "../ShopCreatePopup";

class DashboardShops extends React.Component {
    render() {
        const {match} = this.props

        return (
            <React.Fragment>
                <Button color="primary"
                        variant="contained"
                        component={Link}
                        to={`${match.url}/create`}
                >
                            new
                </Button>

                <ShopList/>

                <div>
                    <Route path={`${match.url}/create`} exact component={ShopCreatePopup}/>
                </div>
            </React.Fragment>
        )
    }
}

export default DashboardShops