import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems, secondaryListItems } from '../listItems'
import Deposits from '../Deposits'
import DashboardOrders from '../DashboardOrders'
import { connect } from 'react-redux'


class Dashboard extends React.Component {

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
            paper: {
                padding: theme.spacing(2),
                display: 'flex',
                overflow: 'auto',
                flexDirection: 'column',
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

    handleDrawerClose() {

    }

    handleDrawerOpen() {

    }

    render() {
        return (
            <div className={this.classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(this.classes.appBar, this.state.open && this.classes.appBarShift)}>
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
                        paper: clsx(this.classes.drawerPaper, !this.state.open && this.classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={this.classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <main className={this.classes.content}>
                    <div className={this.classes.appBarSpacer} />
                    <Container maxWidth="lg" className={this.classes.container}>
                        <Grid container spacing={3}>
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={this.fixedHeightPaper}>
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={this.fixedHeightPaper}>
                                    <Deposits />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper className={this.classes.paper}>
                                    <DashboardOrders />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        );
    }

}

export default connect()(Dashboard)