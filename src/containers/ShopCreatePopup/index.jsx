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
import {get, post} from "../../service/api";
import {isEmpty} from "../../service/utils";
import Search from "../Search";
import {connect} from "react-redux";
import {setShopCityId} from "../../actions/shops-action";
import {addSnackbarEntry} from "../../actions/snackbars-action";

class ShopCreatePopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: [],
            email: '',
            password: '',
            shopName: '',
            cities: [],
            autocomplete: []
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
        this.props.setShopCityId(e.target.value)
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
        }
    }

    async handleSave(e) {
        const error = []
        const {email, password, shopName} = this.state

        if (isEmpty(email) === '' || !email.match(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/))
            error.push('email')

        if (isEmpty(password))
            error.push('password')

        if (isEmpty(shopName))
            error.push('title')

        if (this.props.shopCityId === '')
            error.push('city')

        if (isEmpty(this.props.shopAddress))
            error.push('address')

        if (error.length !== 0) {
            e.preventDefault()
            this.setState({
                ...this.state,
                error: error
            })
        } else {

            // Register user
            const userId = await post('/auth/register', {
                email: email,
                name: shopName,
                password: password,
                repeatPassword: password
            }).then(async regData => {
                this.props.addSnackbarEntry('success', 'Register new user, id: ' + regData.data.id)
                return regData.data.id;
            }).catch(async error => {
                console.log(error.response)
                this.props.addSnackbarEntry('warning', 'User already created')
                const {data} = await get('/user/email/' + email)
                return data.id
            })

            // Set registered user to partner
            await post('/partner/create/' + userId)
            await post('/shop/create', {
                name: shopName,
                address: this.props.shopAddress,
                cityId: this.props.shopCityId,
                partnerId: userId
            }).then(response => {
                this.props.addSnackbarEntry('success', 'Shop was create, id: ' + response.data.id)
            }).catch(error => {
                this.props.addSnackbarEntry('error', error.response.data.message)
            })
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
                                <TextField
                                    error={this.state.error.includes('email')}
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    value={this.state.email}
                                    style={{margin: 8, paddingRight: '10px'}}
                                    onChange={(e => this.handleFieldChange(e, 'email'))}
                                />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <TextField
                                    error={this.state.error.includes('password')}
                                    id="password"
                                    label="Password"
                                    fullWidth
                                    value={this.state.password}
                                    style={{margin: 8}}
                                    onChange={(e => this.handleFieldChange(e, 'password'))}
                                />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{margin: 8, width: '120px'}}
                                    onClick={this.handleGeneratePassword.bind(this)}
                                >
                                    Generate
                                </Button>
                            </div>

                        </div>

                        <div>
                            <h3>Shop details:</h3>
                            <div>
                                <TextField
                                    error={this.state.error.includes('title')}
                                    id="title"
                                    label="Title"
                                    value={this.state.shopName}
                                    fullWidth
                                    style={{margin: 8, paddingRight: '10px'}}
                                    onChange={(e => this.handleFieldChange(e, 'title'))}
                                />
                            </div>

                            <div>
                                <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                    style={{margin: 8, paddingRight: '10px'}}
                                    error={this.state.error.includes('city')}
                                >
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <Select value={this.props.shopCityId} onChange={this.handleCityChange.bind(this)}>
                                        {
                                            this.state.cities.map(city =>
                                                <MenuItem key={city.id} value={city.id}>
                                                    {city.name}
                                                </MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <Search/>
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

const mapStateToProps = (state) => ({
    shopAddress: state.shops.shopAddress,
    shopCityId: state.shops.shopCityId
})

const mapDispatchToProps = {
    setShopCityId,
    addSnackbarEntry
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopCreatePopup)