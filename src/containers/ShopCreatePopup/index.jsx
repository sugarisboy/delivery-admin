import * as React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core";
import {get} from "../../service/api";

class ShopCreatePopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: [],
            email: "",
            password: "",
            shopName: "",
            shopAddress: "",
            cityId: "",
            cities: []
        }

        this.loadCities()
    }

    async loadCities() {
        try {
            const resp = await get('/cities/')
            const cities = resp.data

            this.setState({
                ...this.state,
                cities: cities
            })

        } catch (e) {
            console.log(e)
        }
    }

    handleCityChange(e) {
        this.setState({
            ...this.state,
            cityId: e.target.value
        })
    }

    handleFieldChange(e, type) {
        switch (type) {
            case 'email':
                this.setState({
                    ...this.state,
                    email: e.target.value
                })
                break
            case 'password':
                this.setState({
                    ...this.state,
                    password: e.target.value
                })
                break
            case 'title':
                this.setState({
                    ...this.state,
                    shopName: e.target.value
                })
                break
            case 'address':
                this.setState({
                    ...this.state,
                    shopAddress: e.target.value
                })
                break
        }
    }

    handleSave(e) {
        const error = []
        const {email, password, shopName, shopAddress, cityId} = this.state

        if (email === '' || !email.match(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/))
            error.push('email')

        if (password === '')
            error.push('password')

        if (shopName === '')
            error.push('title')

        if (shopAddress === '')
            error.push('address')

        if (cityId === '')
            error.push('city')


        if (error.length !== 0) {
            e.preventDefault()
            this.setState({
                ...this.state,
                error: error
            })
        } else {

            console.log('save', this.state)

        }
    }

    handleGeneratePassword(e) {
        const gen = Math.random().toString(36).slice(-10)

        this.setState({
            ...this.state,
            password: gen
        })
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

        return (
            <div>
                <Dialog open={true} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create partner and shop</DialogTitle>
                    <DialogContent>

                        <div>
                            <h3>Partner details:</h3>
                            <div>
                                {
                                    this.state.error.includes('email') ?
                                        (
                                            <TextField
                                                error
                                                id="email"
                                                label="Email"
                                                value={this.state.email}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'email'))}
                                            />
                                        )
                                        :
                                        (
                                            <TextField
                                                id="email"
                                                label="Email"
                                                value={this.state.email}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'email'))}
                                            />
                                        )
                                }
                            </div>

                            <div>
                                {
                                    this.state.error.includes('password') ?
                                        (
                                            <TextField
                                                error
                                                id="password"
                                                label="Password"
                                                value={this.state.password}
                                                style={{margin: 8, width: '50%'}}
                                                onChange={(e => this.handleFieldChange(e, 'password'))}
                                            />
                                        )
                                        :
                                        (
                                            <TextField
                                                id="password"
                                                label="Password"
                                                value={this.state.password}
                                                style={{margin: 8, width: '50%'}}
                                                onChange={(e => this.handleFieldChange(e, 'password'))}
                                            />
                                        )
                                }
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{margin: 8}}
                                    onClick={this.handleGeneratePassword.bind(this)}
                                >
                                    Generate
                                </Button>
                            </div>

                        </div>

                        <div>
                            <h3>Shop details:</h3>
                            <div>
                                {
                                    this.state.error.includes('title') ?
                                        (
                                            <TextField
                                                error
                                                id="title"
                                                label="Title"
                                                value={this.state.shopName}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'title'))}
                                            />
                                        )
                                        :
                                        (
                                            <TextField
                                                id="title"
                                                label="Title"
                                                value={this.state.shopName}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'title'))}
                                            />
                                        )
                                }
                            </div>

                            <div>
                                {
                                    this.state.error.includes('city') ?
                                        (
                                            <FormControl className={classes.formControl} style={{margin: 8, width: '90%'}} error>
                                                <InputLabel htmlFor="city">City</InputLabel>
                                                <Select
                                                    value={this.state.cityId}
                                                    onChange={this.handleCityChange.bind(this)}
                                                >
                                                    {
                                                        this.state.cities.map(city => <MenuItem key={city.id}
                                                                                                value={city.id}>{city.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                        :
                                        (
                                            <FormControl className={classes.formControl} style={{margin: 8, width: '90%'}}>
                                                <InputLabel htmlFor="city">City</InputLabel>
                                                <Select
                                                    value={this.state.cityId}
                                                    onChange={this.handleCityChange.bind(this)}
                                                >
                                                    {
                                                        this.state.cities.map(city => <MenuItem key={city.id}
                                                                                                value={city.id}>{city.name}</MenuItem>)
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                }
                            </div>

                            <div>
                                {
                                    this.state.error.includes('address') ?
                                        (
                                            <TextField
                                                error
                                                id="address"
                                                label="Address"
                                                value={this.state.shopAddress}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'address'))}
                                            />
                                        )
                                        :
                                        (
                                            <TextField
                                                id="address"
                                                label="Address"
                                                value={this.state.shopAddress}
                                                style={{margin: 8, width: '90%'}}
                                                onChange={(e => this.handleFieldChange(e, 'address'))}
                                            />
                                        )
                                }
                            </div>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" component={Link} to={`/shops`}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave.bind(this)} color="primary" component={Link} to={`/shops`}>
                            Create
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
}

export default ShopCreatePopup