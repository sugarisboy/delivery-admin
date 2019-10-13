import React from 'react'
import Title from '../Title'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Link from '@material-ui/core/Link'
import {post} from '../../service/api'

class ShopList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            shops: []
        }
    }

    async componentDidMount() {
        try {
            const resp = await post('/shop/page?pageSize=5&pageNumber=1')
            const shops = resp.data.shops

            if (shops) {
                this.setState({
                    shops: shops
                })
            }
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        return (
            <React.Fragment>
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
                        {this.state.shops && this.state.shops.map(shop => {
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
                    <Link color="primary" href="#">
                        See more orders
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default ShopList