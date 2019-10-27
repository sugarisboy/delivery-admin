import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Title from '../../../components/Title'
import {connect} from 'react-redux'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import {Link, Route} from 'react-router-dom'
import OrderEditPopup from '../PopupOrder'
import Loader from "../../../components/Loader";
import OrderStatusInfo from "../OrderStatusInfo/OrderStatusInfo";
import {updateTableOrders} from "../../../actions/orders-action";

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentPage: 0
    }
  }

  componentDidMount() {
    this.props.updateTableOrders()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    const {currentPage} = this.state

    if (prevState.currentPage !== currentPage) {
      this.props.updateTableOrders(currentPage)
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
    const {match} = this.props

    return (
        <>
          <Title>Recent Orders</Title>
          {this.props.updatedOrders.orders.length === 0 && !this.props.updatedOrders.isAllOrders ?
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
                    {this.props.updatedOrders.orders && this.props.updatedOrders.orders.map(order => (
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
                      disabled={this.props.updatedOrders.isAllOrders}
                      color="primary"
                      variant="contained"
                      onClick={e => this.handleChangePage(e, true)}
                      style={{margin: 8}}
                  >
                    Next page
                  </Button>
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

const mapStateToProps = (state) => ({
  updatedOrders: state.orders.updatedOrders
})

const mapDispatchToProps = {updateTableOrders}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOrders)