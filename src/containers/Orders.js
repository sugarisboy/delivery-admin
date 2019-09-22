import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { connect } from 'react-redux'

class DashboardOrders extends React.Component {

  constructor(props) {
    super(props)
    this.classes = makeStyles(theme => ({
      seeMore: {
        marginTop: theme.spacing(3),
      },
    }));
  }

  componentDidMount() {

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
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.shipTo}</TableCell>
                    <TableCell>{row.paymentMethod}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={this.classes.seeMore}>
            <Link color="primary" href="#">
              See more orders
            </Link>
          </div>
        </React.Fragment>
    );
  }

}

export default connect()(DashboardOrders)