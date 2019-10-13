import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../Title'
import {connect} from 'react-redux'
import {post} from '../../service/api'
import moment from "moment";
import {next} from "../../actions/orders-actions";

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentPage: 1
    }
  }

  async componentDidMount() {
    try {
      const resp = await post('/order/page?size=10&page=1')
      const orders = resp.data.orders
      const currentPage = resp.data.currentPage

      if (orders){
        this.setState({
          orders: orders,
          currentPage: currentPage
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  nextPage(e) {
    e.preventDefault()
    const {currentPage} = this.state
    this.props.next(currentPage)
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
                    <TableCell>{moment(order.createdTime).format("DD/MM/YYYY HH:MM:ss")}</TableCell>
                    <TableCell align="right">{order.address}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <button onClick={this.nextPage.bind(this)}>
              See more orders
            </button>
          </div>
        </React.Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    orders: state.orders
  }
}

function mapDispatchToProps(dispatch) {
  return {
    next: (currentPage) => dispatch(next(currentPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOrders)