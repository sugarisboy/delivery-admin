import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/core/SvgIcon/SvgIcon'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge/Badge'
import AppBar from '@material-ui/core/AppBar/AppBar'
import NotificationsIcon from '@material-ui/icons/Notifications'

class Bar extends React.PureComponent {
    render() {
        return (
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Bar