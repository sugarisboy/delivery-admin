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

    nextPage(e) {
        this.setState((state) => ({
            currentPage: state.currentPage + 1
        }))
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
                                    <TableCell align="right">N/A</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div>
                    {this.props.updatedShops.isAllShops ? null :
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.nextPage.bind(this)}
                            style={{margin: 8}}
                        >
                            Next page
                        </Button>
                    }
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