import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../Title'
import {connect} from 'react-redux'
import {post} from '../../service/api'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import {Link, Route} from 'react-router-dom'
import OrderEditPopup from '../PopupOrder'
import Loader from "../Loader";
import OrderStatusInfo from "../OrderStatusInfo/OrderStatusInfo";

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      currentPage: 0,
      isAllOrders: false
    }
  }

  componentDidMount() {
    this.loadOrders()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {currentPage} = this.state

    if (prevState.currentPage !== currentPage) {
      this.loadOrders(currentPage)
    }
  }

  async loadOrders(page = 0) {
    try {
      const resp = await post('/order/page?size=10&page=' + page)
      const {orders, lastPage} = resp.data

      if (orders) {
        this.setState((state) => ({
          orders: state.orders.concat(orders),
          isAllOrders: state.currentPage + 1 >= lastPage
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  async nextPage(e) {
    e.preventDefault()

    this.setState((state) => ({
      currentPage: state.currentPage + 1
    }))
  }

  render() {
    const {match} = this.props

    return (
        <>
          <Title>Recent Orders</Title>
          {this.state.orders.length === 0 && !this.state.isAllOrders ?
              <Loader/>
              :
              <>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Shop ID</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.orders && this.state.orders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>
                            <Link to={`${match.url}/edit/${order.id}`}>
                              {order.id}
                            </Link>
                          </TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>{order.phone}</TableCell>
                          <TableCell>{order.shopId}</TableCell>
                          <TableCell>{moment(order.createdTime).format("DD/MM/YYYY HH:MM:ss")}</TableCell>
                          <TableCell><OrderStatusInfo status={order.localStatus}/></TableCell>
                          <TableCell align="right">{order.address}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div>
                  {this.state.isAllOrders ? null :
                      <Button
                          color="primary"
                          variant="contained"
                          onClick={this.nextPage.bind(this)}
                      >
                        See more orders
                      </Button>
                  }
                </div>
                <div>
                  <Route path={`${match.url}/edit/:id`} exact component={OrderEditPopup}/>
                </div>
              </>
          }
        </>
    );
  }

}

export default connect()(DashboardOrders)