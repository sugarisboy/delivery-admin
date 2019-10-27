import React from 'react'
import {connect} from "react-redux";
import {addSnackbarEntry, disposeSnackbarEntry} from "../../../actions/snackbars-action";
import Snackbar from "@material-ui/core/Snackbar";
import {MySnackbarContentWrapper} from "../Snackbars";

class SnackbarTree extends React.Component {

    constructor(props) {
        super(props)

    }

    async handleClose(e, reason, snack) {
        if (reason === 'clickaway') {
            return
        }

        this.props.disposeSnackbarEntry(snack);
    }

    render() {
        return (

            <div style={{display: 'flex', flexDirection: 'column'}}>
                {this.props.tree.map((snack, i) => (

                    <Snackbar key={i} style={{bottom: 24 + i * 62 + 'px'}}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              direction="up"
                              open={true}
                              onClose={(e, reason) => this.handleClose(e, reason, snack)}
                              autoHideDuration={snack.duration}
                    >
                        <MySnackbarContentWrapper
                            onClose={(e, reason) => this.handleClose(e, reason, snack)}
                            variant={snack.variant}
                            message={snack.message}
                        />
                    </Snackbar>
                ))}
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    tree: state.snackbars.tree,
    message: state.snackbars.message
})

const mapDispatchToProps = {
    addSnackbarEntry,
    disposeSnackbarEntry
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarTree)