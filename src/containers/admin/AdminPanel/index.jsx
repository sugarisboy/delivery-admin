import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Dashboard from '../../dash/Dashboard'
import DashboardOrders from '../../order/DashboardOrders'
import DashboardShops from '../../shop/DashboardShops'
import Bar from '../Bar'
import MenuPanel from '../MenuPanel'
import { withStyles } from '@material-ui/core'
import DashboardProducts from '../../product/DashboardProducts'
import ProductCreateForm from '../../product/ProductCreateForm'
import ProductEditForm from '../../product/ProductEditForm'
import ShopPage from '../../shop/ShopPage'
import UserPage from '../../user/UserPage'

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

    constructor(props) {
        super(props)

        this.routes = [
            {
                path: '/orders',
                component: DashboardOrders
            },
            {
                path: '/shops',
                component: DashboardShops
            },
            {
                path: '/shop/edit/:shopId',
                component: ShopPage
            },
            {
                path: '/shop/:shopId/products/create',
                component: ProductCreateForm
            },
            {
                path: '/shop/:shopId/products/',
                component: DashboardProducts
            },
            {
                path: '/product/:productId/edit',
                component: ProductEditForm
            },
            {
                path: '/shops/edit',
                component: ShopPage
            },
            {
                path: '/users',
                component: UserPage
            }
        ]
    }


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
                            {this.routes.map((route, index) => (
                                <Route key={index} path={route.path} component={route.component}/>
                            ))}
                        </Switch>
                    </Container>
                </main>
            </React.Fragment>
        );
    }

}

export default connect()(withStyles(styles)(AdminPanel))