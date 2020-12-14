import React from 'react'
import TextField from '@material-ui/core/TextField'
import { API_URL, get, patch, upload } from '../../../service/api'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { addSnackbarEntry } from '../../../actions/snackbars-action'
import { DropzoneDialog } from 'material-ui-dropzone'

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
                preview: ''
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
            },
            dropzoneOpen: false,
            preview: `${API_URL}/shop/${id}.jpg`,
            file: null
        })
    }

    submit = async e => {
        e.preventDefault()

        try {
            const resp = await patch('/shop/update', {
                ...this.state.shopData
            })

            const shopId = resp.data.id
            if (shopId) {
                this.uploadImage(shopId)
            }

        } catch (e) {
            const {data} = e.response
            this.props.addSnackbarEntry('error', `${data.field} | ${data.message}`)
        }
    }

    async uploadImage(shopId) {
        const {file} = this.state
        if (file) {
            const formData = new FormData()
            formData.set('img', file)

            try {
                await upload(`/image/shop/${shopId}`, formData)
            } catch (e) {
                this.props.addSnackbarEntry('error', 'Unable to upload image!')
            }
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

    handleOpenDrop(isOpen) {
        this.setState({dropzoneOpen: isOpen})
    }

    handleSaveDrop = files => {
        const file = files[0]

        let reader = new FileReader()

        reader.onloadend = () => {
            this.setState({
                file: file,
                preview: reader.result,
                dropzoneOpen: false
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        const {shopData, preview} = this.state

        return (
            <div>
                <h1>{shopData.name}</h1>
                {shopData.name.length > 0 && (
                    <div>
                        {preview && (<img src={`${preview}`} alt="preview" style={{
                            maxWidth: '240px',
                            maxHeight: '320px',
                            width: 'auto',
                        }}/>)}

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

                            <Button onClick={() => this.handleOpenDrop(true)}>
                                Upload Image
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>

                        </form>

                        <DropzoneDialog
                            open={this.state.dropzoneOpen}
                            onSave={this.handleSaveDrop}
                            acceptedFiles={['image/*']}
                            showPreviews={true}
                            maxFileSize={5000000}
                            onClose={() => this.handleOpenDrop(false)}
                        />
                    </div>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = {
    addSnackbarEntry
}

export default connect(null, mapDispatchToProps)(ShopForm)