import React from 'react'
import Title from '../Title'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import {connect} from "react-redux";
import {updateTableShops} from "../../actions/shops-action";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ArchiveIcon from '@material-ui/icons/Archive';
import {Link} from "react-router-dom";

class ShopList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 0
        }
    }

    componentDidMount() {
        this.props.updateTableShops()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const {currentPage} = this.state

        if (prevState.currentPage !== currentPage) {
            this.props.updateTableShops(currentPage)
        }
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
                <Title>Shops</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Open time</TableCell>
                            <TableCell>Close time</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.updatedShops.shops && this.props.updatedShops.shops.map(shop => {
                            const {schedule} = shop
                            const {open, close} = schedule
                            const openTime = `${open[0][0]}:${open[0][1]}`
                            const closeTime = `${close[0][0]}:${close[0][1]}`

                            return (
                                <TableRow key={shop.id}>
                                    <TableCell>{shop.id}</TableCell>
                                    <TableCell>{shop.name}</TableCell>
                                    <TableCell>{shop.description}</TableCell>
                                    <TableCell>{openTime}</TableCell>
                                    <TableCell>{closeTime}</TableCell>
                                    <TableCell align="right">{shop.address}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={'/shop/' + shop.id + '/products'}>
                                            <ArchiveIcon fontSize="small"/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

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
                        disabled={this.props.updatedShops.isAllShops}
                        color="primary"
                        variant="contained"
                        onClick={e => this.handleChangePage(e, true)}
                        style={{margin: 8}}
                    >
                        Next page
                    </Button>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    updatedShops: state.shops.updatedShops
})

const mapDispatchToProps = {updateTableShops}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList)