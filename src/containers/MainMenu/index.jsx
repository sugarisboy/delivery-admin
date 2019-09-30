import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import ReceiptIcon from '@material-ui/icons/Receipt'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SettingsIcon from '@material-ui/icons/Settings'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'

const styles = theme => ({

})

class MainMenu extends React.PureComponent {

    constructor(props) {
        super(props)

        this.items = [
            {
                title: 'Dashboard',
                icon: <DashboardIcon/>,
                href: '/'
            },
            {
                title: 'Orders',
                icon: <ReceiptIcon/>,
                href: '/orders'
            },
            {
                title: 'Shops',
                icon: <ShoppingCartIcon/>,
                href: '/shops'
            },
            {
                title: 'Customers',
                icon: <PeopleIcon/>,
                href: '/customers'
            },
            {
                title: 'Finance',
                icon: <AttachMoneyIcon/>,
                href: '/partners'
            },
            {
                title: 'System',
                icon: <SettingsIcon/>,
                href: '/partners'
            }
        ]
    }

    render() {
        return (
            <div>
                {this.items.map((item, index) => (
                    <ListItem button
                              key={index}
                              component={Link}
                              to={item.href}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.title}/>

                    </ListItem>
                ))}
            </div>
        )
    }

}

export default withStyles(styles)(MainMenu)