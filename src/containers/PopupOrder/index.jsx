import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";

class PopupOrder extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => {
        this.setOpen(true);
    };

    handleClose = () => {
        this.setOpen(false);
    };

    handleSave = () => {
        this.setOpen(false);
    }

    setOpen = (a) => {
        this.setState({
            open: a
        })
    }

    render() {
        return (
            <div>
                <Button variant="outlined"
                        color="primary"
                        component={Link}
                        to={'/orders/edit/' + order.id}
                        onClick={this.handleClickOpen}
                >
                    Display
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}

export default PopupOrder