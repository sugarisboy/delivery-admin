import React from 'react'
import Link from '@material-ui/core/Link'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../Title'
import { connect } from 'react-redux'
import { get } from '../../service/api'

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    try {
      const resp = await get('/order/page?pageSize=5&pageNumber=1')
      const orders = resp.data.orders
      console.log(orders)
      if (orders){
        this.setState({
          orders: orders
        })
      }
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    return (
        <React.Fragment>
          <Title>Recent Orders</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Shop ID</TableCell>
                <TableCell>Time</TableCell>
                <TableCell align="right">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.orders && this.state.orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.shopId}</TableCell>
                    <TableCell>{order.createdTime}</TableCell>
                    <TableCell align="right">{order.address}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <Link color="primary" href="#">
              See more orders
            </Link>
          </div>
        </React.Fragment>
    );
  }

}

export default connect()(DashboardOrders)