import React from 'react'
import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
    drawer: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240
    }
})

class MenuPanel extends React.PureComponent {
    render() {
        const {classes} = this.props

        return (
            <Drawer variant="permanent" className={classes.drawer}>
                <MainMenu/>
            </Drawer>
        )
    }

}

export default withStyles(styles)(MenuPanel)