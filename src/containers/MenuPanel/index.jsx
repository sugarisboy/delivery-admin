import React from 'react'
import Divider from '@material-ui/core/Divider'
import MainMenu from '../MainMenu'
import Drawer from '@material-ui/core/Drawer'

class MenuPanel extends React.PureComponent {

    render() {
        return (
            <Drawer variant="permanent">
                <div>
                    <h2>
                        Qwik
                    </h2>
                </div>
                <Divider />
                <MainMenu/>
                <Divider />
            </Drawer>
        )
    }

}

export default MenuPanel