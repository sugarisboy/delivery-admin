import React from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core";
import {loadCategories} from "../../../service/api";
import {addSnackbarEntry} from "../../../actions/snackbars-action";
import {connect} from "react-redux";
import {post, upload} from "../../../service/api";
import { isEmpty } from '../../../utils/string-utils'

class ProductCreateForm extends React.Component {

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
            error: []
        };
    }

    async componentDidMount() {
        const categories = await loadCategories()
        this.setState({
            categories: categories
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
        }
    }

    async handleSave(e) {
        const {match} = this.props
        const {shopId} = match.params
        const {url} = match

        const error = []

        const {title, price, description, categoryId, file} = this.state
        if (isEmpty(title)) {
            error.push('title')
        } else if (title.length <= 3) {
            error.push('title')
            this.props.addSnackbarEntry('warning', 'Title too short')
        }
        if (isEmpty(price))
            error.push('price')
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

        await post('/product/create', {
            title: title,
            category: categoryId,
            description: description,
            price: price,
            shopId: shopId,
            value: 1
        }).then(response => {
            this.props.addSnackbarEntry('success', 'Product was added to shop')

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

            this.props.history.push(url.replace('/create', ''))
        }).catch(error => {
            this.props.addSnackbarEntry('error', error.response.data.message)
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

        let {preview} = this.state;
        let $imagePreview = null;
        if (preview) {
            $imagePreview = (
                <img src={preview} style={{maxWidth: '240px', maxHeight: '320px', width: 'auto'}}/>);
        }

        const {error} = this.state

        return (
            <>

                <div>
                    <h3>Product creation:</h3>
                    <div style={{width: '600px'}}>

                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <div style={{padding: '8px'}}>
                                <div style={{width: '240px', height: '320px', padding: '8px'}}>

                                    {
                                        $imagePreview == null ?
                                            <Button onClick={this.handleOpenDrop.bind(this)}>
                                                Upload Image
                                            </Button>
                                            :
                                            $imagePreview
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
                                        <InputLabel htmlFor="city">Category</InputLabel>
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

                        <div style={{marginLeft: 'auto', display: 'block', float: 'right', paddingRight: '24px'}}>
                            <Button
                                onClick={this.handleSave.bind(this)}
                                color="primary"
                                variant="contained"
                                /*component={Link}
                                to="/"*/
                            >
                                Save
                            </Button>
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
        );
    }
}

const mapDispatchToProps = {
    addSnackbarEntry
}

export default connect(null, mapDispatchToProps)(ProductCreateForm)