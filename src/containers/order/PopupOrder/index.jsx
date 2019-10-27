import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {Link} from 'react-router-dom'
import {get, patch} from "../../../service/api";
import Loader from "../../../components/Loader";
import {makeStyles} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import OrderStatusInfo from "../OrderStatusInfo/OrderStatusInfo";
import moment from "moment";
import {updateTableOrders} from "../../../actions/orders-action";
import {connect} from "react-redux";

class OrderEditPopup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            orderId: props.match.params.id,
            isProductLoaded: false,
            products: []
        }
        this.loadOrder()
    }

    async loadOrder() {
        try {
            const {data} = await get('/order/' + this.state.orderId)
            if (data.id) {
                this.setState({
                    order: data,
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    async loadProducts() {
        const products = []
        const promises = this.state.order.products.map(async product => {
            const id = product.productId
            const {data} = await get('/product/' + id)
            products[id] = {
                ...data,
                count: product.count
            }
        })
        // Ожидаем конца выполнения мапы
        await Promise.all(promises);
        this.setState({
            products: products
        })
    }

    handleCostWithDeliveryChange(e) {
        this.setState({
            order: {
                ...this.state.order,
                costAndDelivery: e.target.value
            }
        })
    }

    handleExpansionProductClick(e) {
        if (!this.state.isProductLoaded) {
            this.setState({
                isProductLoaded: true
            })
            this.loadProducts()
        }
    }

    async handleCountChange(e, id) {
        const value = parseFloat(e.target.value)
        if (value < 0)
            return e.preventDefault()

        this.setState(
            {
                products: await this.state.products.map(product => {
                    return product.id !== id ? product : {
                        ...product,
                        count: value
                    }
                })
            }
        )

        this.setState({
            order: {
                ...this.state.order,
                cost: this.calculateNewSum()
            }
        })
    }

    calculateNewSum() {
        var i = 0
        this.state.products.map(product => {
            i += (product.count * product.price)
        })
        return i.toFixed(2)
    }

    statusLog() {
        return (
            this.state.order.status.map(status => (
                <ExpansionPanelDetails key={status.status}>
                    <div>
                        <OrderStatusInfo status={status.status}/>
                    </div>
                    <div style={{textAlign: 'right', marginLeft: 'auto'}}>
                        {moment(status.date).format("DD/mm HH:mm:ss")}
                    </div>
                </ExpansionPanelDetails>

            ))
        )
    }

    statusGui() {
        const currentStatus = this.state.order.localStatus
        const isAllowNext = currentStatus < 3
        const isNotCompleted = currentStatus < 10

        return (
            <>
                {isAllowNext ?
                    <ExpansionPanelDetails style={{height: 52}}>
                        <div>
                            <OrderStatusInfo status={this.state.order.localStatus + 1}/>
                        </div>
                        <div style={{textAlign: 'right', marginLeft: 'auto'}}>
                            <Button
                                color="primary"
                                style={{marginLeft: 4, marginTop: -8}}
                                onClick={(e) => this.handleUpdateStatus(e, this.state.order.localStatus + 1)}
                            >
                                Next status
                            </Button>
                        </div>
                    </ExpansionPanelDetails>
                    : null}
                {isNotCompleted ?
                    <>
                        <ExpansionPanelDetails style={{height: 52}}>
                            <div>
                                <OrderStatusInfo status={10}/>
                            </div>
                            <div style={{textAlign: 'right', marginLeft: 'auto'}}>
                                <Button
                                    color="primary"
                                    style={{marginLeft: 4, marginTop: -8}}
                                    onClick={(e) => this.handleUpdateStatus(e, 10)}
                                >
                                    Done
                                </Button>
                            </div>
                        </ExpansionPanelDetails>
                        <ExpansionPanelDetails style={{height: 52}}>
                            <div>
                                <OrderStatusInfo status={11}/>
                            </div>
                            <div style={{textAlign: 'right', marginLeft: 'auto'}}>
                                <Button
                                    color="primary"
                                    style={{marginLeft: 4, marginTop: -8}}
                                    onClick={(e) => this.handleUpdateStatus(e, 12)}
                                >
                                    Cancel order
                                </Button>
                            </div>
                        </ExpansionPanelDetails>
                    </>
                    : null}
            </>
        )
    }

    productsGui() {
        if (this.state.products.length !== 0) {
            return (
                this.state.products.map(product => (
                    <ExpansionPanelDetails key={product.id}>
                        <div>
                            {product.title}:
                        </div>
                        <div style={{textAlign: 'right', marginLeft: 'auto'}}>
                            {product.price % 1 === 0 ? product.price + '.00' : product.price}₽ ×
                            <TextField
                                id="cost"
                                value={product.count}
                                onChange={(e) => this.handleCountChange(e, product.id)}
                                type="number"
                                inputProps={{
                                    'aria-label': 'description',
                                }}
                                style={{marginLeft: 4, marginTop: -8, width: 40}}
                            />
                        </div>
                    </ExpansionPanelDetails>
                ))
            )
        } else {
            return (
                <ExpansionPanelDetails>
                    <div>
                        <Loader/>
                    </div>
                </ExpansionPanelDetails>
            )
        }
    }

    async handleSave(e) {
        const order = this.state.order;

        const products = []
        this.state.products.forEach(product => {
            products.push({
                productId: product.id,
                count: product.count
            })
        })

        const req = {
            id: order.id,
            products: products,
            costAndDelivery: order.costAndDelivery
        }

        const {data} = await patch('/order/update', req)
    }

    async handleUpdateStatus(e, status) {
        if (window.confirm('You are sure?')) {

            const req = {
                id: this.state.order.id,
                status: status
            }

            const {data} = await patch('/order/update', req)

            this.setState({
                order: {
                    ...this.state.order,
                    localStatus: data.localStatus,
                    status: data.status
                }
            })
            this.props.setTableOrders(this.state.order)
        }
    }

    render() {
        const classes = makeStyles(theme => ({
            root: {
                width: '100%',
                margin: 10
            },
            heading: {
                fontSize: theme.typography.pxToRem(15),
                fontWeight: theme.typography.fontWeightRegular,
            }
        }));

        return (
            <div>
                {this.state.order ?
                    <Dialog open={true} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Order#{this.state.order.id}:</DialogTitle>
                        <DialogContent>
                            {this.state.order.comments != null &&
                            <DialogContentText>
                                Description: {this.state.order.comments}
                            </DialogContentText>
                            }
                            <TextField
                                disabled
                                id="name"
                                label="Client"
                                defaultValue={this.state.order.name}
                                style={{margin: 8, width: '45%'}}
                            />
                            <TextField
                                disabled
                                id="email"
                                label="Email"
                                defaultValue={this.state.order.email}
                                style={{margin: 8, width: '45%'}}
                            />
                            <br/>
                            <TextField
                                disabled
                                id="address"
                                label="Address"
                                defaultValue={this.state.order.address}
                                style={{margin: 8, width: '45%'}}
                            />
                            <TextField
                                disabled
                                id="phone"
                                label="Phone"
                                defaultValue={this.state.order.phone}
                                style={{margin: 8, width: '45%'}}
                            />
                            <br/>
                            <TextField
                                disabled
                                id="cost"
                                label="Order cost"
                                value={this.state.order.cost}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{margin: 8, width: '45%'}}
                            />
                            <TextField
                                id="costwithdelivery"
                                label="Order cost with delivery"
                                value={this.state.order.costAndDelivery}
                                onChange={this.handleCostWithDeliveryChange.bind(this)}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{margin: 8, width: '45%'}}
                            />

                            <div className={classes.root}>
                                <ExpansionPanel onChange={this.handleExpansionProductClick.bind(this)}>
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography className={classes.heading}>Products</Typography>
                                    </ExpansionPanelSummary>
                                    {this.productsGui()}
                                </ExpansionPanel>
                            </div>

                            <br/>

                            {this.state.order.status.length !== 0 ?
                                <div className={classes.root}>
                                    <ExpansionPanel onChange={this.handleExpansionProductClick.bind(this)}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Status Log</Typography>
                                        </ExpansionPanelSummary>

                                        {this.statusLog()}
                                        {this.statusGui()}

                                    </ExpansionPanel>
                                </div>
                                : null}
                        </DialogContent>

                        <DialogActions>
                            <Button color="primary" component={Link} to={`/orders`}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleSave.bind(this)} color="primary" component={Link}
                                    to={`/orders`}>
                                Save
                            </Button>
                        </DialogActions>

                    </Dialog>
                    :
                    <Dialog open={true} aria-labelledby="form-dialog-title">
                        <Loader/>
                    </Dialog>
                }
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    setTableOrders: () => dispatch(updateTableOrders())
})

export default connect(null, mapDispatchToProps)(OrderEditPopup)