import React from 'react'
import TextField from '@material-ui/core/TextField'
import { get, patch } from '../../../service/api'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { addSnackbarEntry } from '../../../actions/snackbars-action'

class ShopForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            shopData: {
                name: '',
                address: '',
                description: '',
                deliveryCost: 0,
                freeDeliveryCost: 0,
                minOrderCost: 0,
            }
        }
    }

    async componentDidMount() {
        const {id} = this.props
        const resp = await get(`/shop/${id}`)
        const shopData = resp.data

        this.setState({
            shopData: {
                name: shopData.name || '',
                address: shopData.address || '',
                description: shopData.description || '',
                deliveryCost: shopData.deliveryCost,
                freeDeliveryCost: shopData.freeDeliveryCost,
                minOrderCost: shopData.minOrderCost,
                id: shopData.id
            }
        })
    }

    submit = async e => {
        e.preventDefault()

        try {
            await patch('/shop/update', {
                ...this.state.shopData
            })
        } catch (e) {
            const {data} = e.response
            this.props.addSnackbarEntry('error', `${data.field} | ${data.message}`)
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        const newShopData = {...this.state.shopData}

        newShopData[name] = value

        this.setState({
            shopData: newShopData
        })
    }

    render() {
        const {shopData} = this.state

        return (
            <div>
                <h1>{shopData.name}</h1>
                {shopData.name.length > 0 && (
                    <>
                        <h2>Edit</h2>
                        <form onSubmit={this.submit} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'nowrap',
                            width: 400,
                            margin: 30
                        }}>
                            <TextField value={shopData.name}
                                       type="text"
                                       onChange={this.handleChange}
                                       name="name"
                                       placeholder="Name"
                            />

                            <TextField value={shopData.description}
                                       type="text"
                                       onChange={this.handleChange}
                                       name="description"
                                       placeholder="Description"
                            />

                            <TextField value={shopData.address}
                                       type="text"
                                       onChange={this.handleChange}
                                       name="address"
                                       placeholder="Address"
                            />

                            <TextField value={shopData.deliveryCost}
                                       type="number"
                                       onChange={this.handleChange}
                                       name="deliveryCost"
                                       placeholder="Delivery cost"
                            />

                            <TextField value={shopData.freeDeliveryCost}
                                       type="number"
                                       onChange={this.handleChange}
                                       name="freeDeliveryCost"
                                       placeholder="Free delivery cost"
                            />

                            <TextField value={shopData.minOrderCost}
                                       type="number"
                                       onChange={this.handleChange}
                                       name="minOrderCost"
                                       placeholder="Minimum order cost"
                            />

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>

                        </form>
                    </>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = {
    addSnackbarEntry
}

export default connect(null, mapDispatchToProps)(ShopForm)