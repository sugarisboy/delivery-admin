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
import Button from "@material-ui/core/Button";
import PopupOrder from "../PopupOrder";
import {Link} from "react-router-dom";

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentPage: -1,
      isAllOrders: false
    }
  }

  async componentDidMount() {
    this.upload()
  }

  async upload() {
    var {currentPage} = this.state

    try {
      const nextPage = (currentPage + 1)
      const resp = await post('/order/page?size=25&page=' + nextPage)
      const {orders, lastPage} = resp.data
      currentPage = resp.data.currentPage

      if (orders) {
        this.setState({
          orders: this.state.orders.concat(orders),
          currentPage: currentPage,
          isAllOrders: currentPage + 1 >= lastPage
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  nextPage(e) {
    e.preventDefault()
    this.upload()
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
            { this.state.isAllOrders ? null :
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.nextPage.bind(this)}
                >
                  See more orders
                </Button>
            }
          </div>
        </React.Fragment>
    );
  }

}

export default connect()(DashboardOrders)