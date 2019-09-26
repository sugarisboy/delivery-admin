import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import { Link } from 'react-router-dom'

class MainMenu extends React.PureComponent {

    constructor(props) {
        super(props)

        this.items = [
            {
                title: 'Dashboard',
                icon: <DashboardIcon/>,
                href: '/admin'
            },
            {
                title: 'Orders',
                icon: <ShoppingCartIcon/>,
                href: '/orders'
            },
            {
                title: 'Customers',
                icon: <PeopleIcon/>,
                href: '/customers'
            },
            {
                title: 'Partners',
                icon: <PeopleIcon/>,
                href: '/partners'
            },
            {
                title: 'Finance',
                icon: <PeopleIcon/>,
                href: '/partners'
            },
            {
                title: 'System',
                icon: <PeopleIcon/>,
                href: '/partners'
            }
        ]
    }

    render() {
        return (
            <div>
                {this.items.map(item => (
                    <ListItem button
                              component={props => (
                                  <Link to={item.href} {...props}/>
                              )}>
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

export default MainMenu