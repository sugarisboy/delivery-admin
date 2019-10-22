import React from 'react'
import Title from "../Title";
import {updateTableProducts} from "../../actions/products-action";
import {connect} from "react-redux";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Loader from "../Loader";
import {addSnackbarEntry} from "../../actions/snackbars-action";
import {get} from "../../service/api"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";

class DashboardProducts extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            shopId: props.match.params.shopId,
            currentPage: 0,
            categories: []
        }
    }

    componentDidMount() {

        const {shopId, currentPage} = this.state

        this.loadCategories()
        this.props.updateTableProducts(currentPage, shopId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {shopId, currentPage} = this.state

        if (prevState.currentPage !== currentPage)
            this.props.updateTableProducts(currentPage, shopId)
    }

    async loadCategories() {
        await get('/product/categories'
        ).then(response => {
            this.setState({
                ...this.state,
                categories: response.data
            })
        }).catch(() => {
            this.props.addSnackbarEntry('warning', 'Failed load categories')
        })
    }

    findCategoryById(id) {
        const category = this.state.categories.find(cat => cat.id === +id)
        return category ? category.title : id
    }

    handleChangePage(e, next) {
        const {currentPage} = this.state
        const listedTo = currentPage + (next ? +1 : -1)
        this.setState({
            ...this.state,
            currentPage: listedTo
        })
    }

    render() {
        return (
            <>
                <Title>Products shops#{this.state.shopId}</Title>
                {this.props.updatedProducts.products.length === 0 && !this.props.updatedProducts.isAllProducts ?
                    <Loader/>
                    :
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Shop ID</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Available</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.updatedProducts.products && this.props.updatedProducts.products.map(product => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>{this.findCategoryById(product.category)}</TableCell>
                                    <TableCell>{product.shopId}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.available ? "" : "false"}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }

                <div style={{display: 'block', float: 'right'}}>
                    <Button
                        disabled={this.state.currentPage < 1}
                        color="primary"
                        variant="contained"
                        onClick={e => this.handleChangePage(e, false)}
                        style={{margin: 8}}
                    >
                        Previous page
                    </Button>

                    <Button
                        disabled={this.props.updatedProducts.isAllProducts}
                        color="primary"
                        variant="contained"
                        onClick={e => this.handleChangePage(e, true)}
                        style={{margin: 8}}
                    >
                        Next page
                    </Button>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    updatedProducts: state.products.updatedProducts
})

const mapDispatchToProps = {
    updateTableProducts,
    addSnackbarEntry
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProducts)