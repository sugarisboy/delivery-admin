import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MainMenu from '../MainMenu'
import Dashboard from '../Dashboard'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import DashboardOrders from '../DashboardOrders'


class AdminPanel extends React.Component {

    constructor(props) {
        super(props)
        this.drawerWidth = 240

        this.classes = makeStyles(theme => ({
            root: {
                display: 'flex',
            },
            toolbar: {
                paddingRight: 24, // keep right padding when drawer closed
            },
            toolbarIcon: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0 8px',
                ...theme.mixins.toolbar,
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                marginLeft: this.drawerWidth,
                width: `calc(100% - ${this.drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            menuButton: {
                marginRight: 36,
            },
            menuButtonHidden: {
                display: 'none',
            },
            title: {
                flexGrow: 1,
            },
            drawerPaper: {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: this.drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            drawerPaperClose: {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            },
            appBarSpacer: theme.mixins.toolbar,
            content: {
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            },
            container: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
            fixedHeight: {
                height: 240,
            },
        }))

        this.state = {
            open: true
        }

        this.fixedHeightPaper = clsx(
            this.classes.paper,
            this.classes.fixedHeight
        )
    }

    render() {
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar position="absolute"
                        className={clsx(this.classes.appBar, this.state.open && this.classes.appBarShift)}>
                    <Toolbar className={this.classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={clsx(this.classes.menuButton, this.state.open && this.classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={this.classes.title}>
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper:
                                clsx(this.classes.drawerPaper, !this.state.open && this.classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={this.classes.toolbarIcon}>
                        <h2>Qwik</h2>
                    </div>
                    <Divider />
                        <MainMenu/>
                    <Divider />
                </Drawer>
                <main className={this.classes.content}>
                    <div className={this.classes.appBarSpacer} />
                    <Container maxWidth="lg" className={this.classes.container}>
                        <Switch>
                            <Route exact path='/'>
                                <Dashboard/>
                            </Route>
                            <Route path='/orders'>
                                <DashboardOrders/>
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </div>
        );
    }

}

export default connect()(AdminPanel)