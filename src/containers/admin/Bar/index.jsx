import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import { connect } from 'react-redux'
import { logout } from '../../../actions/login-actions'

const styles = (theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        marginLeft: 240,
        width: `calc(100% - 167px)`,
    },
    rightBlock: {
        marginLeft: 'auto',
        display: 'flex'
    }
})

class Bar extends React.PureComponent {

    render() {
        const {classes} = this.props

        return (
            <AppBar position="fixed" className={classes.root}>
                <Toolbar>
                    <Typography component="h1" variant="h6" color="inherit" noWrap>
                        Qwik
                    </Typography>
                    <div className={classes.rightBlock}>
                        <Typography component="span" variant="h6" color="inherit" noWrap>
                            {this.props.username} |
                        </Typography>

                        <Button className={classes.logout} color="inherit" onClick={() => this.props.logout()}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    username: state.login.username
})

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Bar))