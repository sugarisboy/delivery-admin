import React from 'react'
import ShopList from '../ShopList'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

class DashboardShops extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Button color="primary"
                        variant="contained"
                        component={Link}
                        to="/newshop"
                >
                    New Shop
                </Button>

                <ShopList/>
            </React.Fragment>
        )
    }
}

export default DashboardShops