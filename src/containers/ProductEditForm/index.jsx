import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";
import {isEmpty, loadCategories} from "../../service/utils";
import {addSnackbarEntry} from "../../actions/snackbars-action";
import {connect} from "react-redux";
import {del, get, patch, upload} from "../../service/api"
import DeleteIcon from '@material-ui/icons/Delete';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

class ProductEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            categories: [],
            file: null,
            preview: null,
            title: '',
            price: '',
            description: '',
            categoryId: '',
            available: true,
            shopId: '',
            error: [],
        };
    }

    async componentDidMount() {
        const categories = await loadCategories()
        this.setState({
            categories: categories
        })
        this.loadProduct()
    }

    async loadProduct() {
        const {match} = this.props
        const {productId} = match.params

        await get(`/product/${productId}`
        ).then(async response => {
            const {data} = response
            const {available, title, price, description, category, shopId, value} = data
            this.setState({
                available,
                title,
                price,
                description,
                shopId,
                value,
                categoryId: category,
                preview: `http://localhost:8080/img/product/${productId}.jpg`
            })

            await get(`/img/product/${productId}.jpg`).catch(error => {
                if (error.response.data.status === 404) {
                    this.setState({
                        preview: undefined
                    })
                }
            })

        }).catch(error => {
            console.log(error.response)
        })
    }

    handleCloseDrop() {
        this.setState({
            open: false
        });
    }

    async handleSaveDrop(files) {
        const file = files[0]

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                file: file,
                preview: reader.result,
                open: false
            });
        }

        reader.readAsDataURL(file)
    }

    handleOpenDrop() {
        this.setState({
            open: true,
        });
    }

    handleChange(e, action) {
        switch (action) {
            case 'title':
                this.setState({
                    title: e.target.value
                })
                break
            case 'price':
                this.setState({
                    price: e.target.value
                })
                break
            case 'description':
                this.setState({
                    description: e.target.value
                })
                break
            case 'category':
                this.setState({
                    categoryId: e.target.value
                })
                break
            case 'available':
                this.setState({
                    available: !this.state.available
                })
                break
            case 'change-img':
                this.setState({
                    file: null,
                    preview: undefined
                })
                break
        }
    }

    async handleSave(e) {
        const {match} = this.props
        const {productId} = match.params

        const error = []

        const {title, price, description, categoryId, file, available, shopId} = this.state
        if (isEmpty(title)) {
            error.push('title')
        } else if (title.length <= 3) {
            error.push('title')
            this.props.addSnackbarEntry('warning', 'Title too short')
        }
        if (price <= 0) {
            error.push('price')
            this.props.addSnackbarEntry('error', 'Price must be positive')
        }
        if (categoryId === '') {
            error.push('category')
            this.props.addSnackbarEntry('error', 'Please select category')
        }

        if (error.length !== 0) {
            this.setState({
                error: error
            })
            return
        }

        console.log(available)
        await patch('/product/update', {
            id: productId,
            description,
            title,
            price,
            available,
            category: categoryId,
        }).then(response => {
            this.props.addSnackbarEntry('success', 'Product was updated')

            if (file !== null) {
                const {data} = response
                const productId = data.id

                const body = new FormData()
                body.set('img', file)
                upload(`/image/product/${productId}`, body
                ).catch(error => {
                    this.props.addSnackbarEntry('warning', 'Failed loaded image')
                    console.error(error.response)
                })
            }

            this.props.history.push(`/shop/${shopId}/products`)
        }).catch(error => {
            error.response && this.props.addSnackbarEntry('error', error.response.data.message)
        })
    }

    async handleDelete(e) {
        if (window.confirm("You are sure?")) {
            const {match} = this.props
            const {productId} = match.params
            const {shopId} = this.state

            await del(`/product/${productId}`
            ).then(response => {
                this.props.history.push(`/shop/${shopId}/products`)
            }).catch(error => {
                this.props.addSnackbarEntry('error', "Error delete product");
                console.log(error.response)
            })
        }
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

        let {preview} = this.state;
        let $imagePreview = null;
        if (preview) {
            $imagePreview = (
                <img src={preview} style={{
                    maxWidth: '240px',
                    maxHeight: '320px',
                    width: 'auto',
                    position: 'relative',
                    bottom: '36px'
                }}/>
            );
        }

        const {error} = this.state

        return (
            <>

                <div>
                    <h3>Edit product:</h3>
                    <div style={{width: '600px'}}>


                        {/* Edit form */}
                        <div style={{display: 'flex', flexDirection: 'row'}}>

                            {/* Left side */}
                            <div style={{padding: '8px'}}>
                                <div style={{width: '240px', height: '320px', padding: '8px'}}>
                                    {$imagePreview == null ?
                                        <Button onClick={this.handleOpenDrop.bind(this)}> Upload Image </Button>
                                        :
                                        <div>
                                            <Button
                                                style={{
                                                    top: '8px',
                                                    backgroundColor: 'tomato',
                                                    position: 'relative',
                                                    zIndex: '10',
                                                    marginLeft: 'auto',
                                                    float: 'right'
                                                }}
                                                onClick={(e) => this.handleChange(e, 'change-img')}
                                                color="primary"
                                                variant="contained"
                                            >
                                                <HighlightOffIcon/>
                                            </Button>
                                            {$imagePreview}
                                        </div>
                                    }
                                </div>
                                <div>
                                    <FormControl
                                        error={error.includes('category')}
                                        className={classes.formControl}
                                        fullWidth
                                        variant="outlined"
                                        style={{margin: 8, paddingRight: '10px', marginTop: '21px'}}
                                    >
                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <Select
                                            value={this.state.categoryId}
                                            onChange={(e) => this.handleChange(e, 'category')}
                                        >
                                            {
                                                this.state.categories.map(category =>
                                                    <MenuItem key={category.id} value={category.id}>
                                                        {category.title}
                                                    </MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            {/* Right side */}
                            <div style={{padding: '8px', marginLeft: 'auto'}}>
                                <TextField
                                    error={error.includes('title')}
                                    fullWidth
                                    variant="outlined"
                                    label="Title"
                                    value={this.state.title}
                                    style={{margin: 8, paddingRight: '24px'}}
                                    onChange={(e) => this.handleChange(e, 'title')}
                                />
                                <TextField
                                    error={error.includes('price')}
                                    fullWidth
                                    variant="outlined"
                                    label="Price"
                                    type="number"
                                    value={this.state.price}
                                    style={{margin: 8, paddingRight: '24px'}}
                                    onChange={(e) => this.handleChange(e, 'price')}
                                />
                                <TextField
                                    error={error.includes('description')}
                                    fullWidth
                                    variant="outlined"
                                    label="Description"
                                    multiline={true}
                                    value={this.state.description}
                                    rows={11}
                                    rowsMax={11}
                                    style={{margin: 8, paddingRight: '24px'}}
                                    onChange={(e) => this.handleChange(e, 'description')}
                                />
                            </div>
                        </div>


                        {/* Down bar with button */}
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{paddingLeft: '8px'}}>
                                <FormControlLabel
                                    value={!this.state.available}
                                    onChange={(e) => this.handleChange(e, 'available')}
                                    control={<Switch color="primary"/>}
                                    label="Available"
                                    labelPlacement="start"
                                />
                            </div>
                            <div style={{marginLeft: 'auto', display: 'block', float: 'right', paddingRight: '24px'}}>
                                <Button style={{marginRight: '8px', backgroundColor: 'tomato'}}
                                        onClick={this.handleDelete.bind(this)}
                                        color="primary"
                                        variant="contained"
                                >
                                    <DeleteIcon/>
                                </Button>
                                <Button
                                    onClick={this.handleSave.bind(this)}
                                    color="primary"
                                    variant="contained"
                                >
                                    Save edit
                                </Button>
                            </div>
                        </div>


                    </div>
                </div>

                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSaveDrop.bind(this)}
                    acceptedFiles={['image/*']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleCloseDrop.bind(this)}
                />
            </>
        )
    }
}

const mapDispatchToProps = {
    addSnackbarEntry
}

export default connect(null, mapDispatchToProps)(ProductEditForm)