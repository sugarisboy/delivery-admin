import React from 'react'
import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'

class MenuPanel extends React.PureComponent {

    render() {
        return (
            <Drawer variant="permanent">
                <MainMenu/>
            </Drawer>
        )
    }

}

export default MenuPanel