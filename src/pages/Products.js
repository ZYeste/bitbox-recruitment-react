import React, { Component } from 'react';

import api from '../api';
import { Link } from "react-router-dom";

import Moment from 'react-moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

import AppLoginBar from '../components/AppLoginBar';
import Loading from '../components/Loading';

export class Products extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isLoading: false,
    }
  }

  getProducts() {
    const self = this;

    this.setState({
      isLoading: true,
    });

    api.get('products')
    .then(res => {

      this.setState({
        products: res.data,
        isLoading: false,
      });

    }).catch(function (error) {

      self.setState({
        isLoading: false,
      });

      self.props.history.push('/');
    });
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {

    const StyledTableCell = withStyles(theme => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);

    const StyledTableRow = withStyles(theme => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.background.default,
        },
      },
    }))(TableRow);

    const classes = makeStyles({
      table: {
        minWidth: 700,
      },
    });

    let loadingHtml = (this.state.isLoading) ? <Loading/>: '';

    return (
      <div>

        <AppLoginBar/>
     
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            item xs={8}>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
              <Typography component="h1" variant="h5" className="wrapper-title">
                Products
              </Typography>
            </Grid>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Item code</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>State</StyledTableCell>
                    <StyledTableCell align="right">Prices (€)</StyledTableCell>
                    <StyledTableCell>Creation date</StyledTableCell>
                    <StyledTableCell>Creator</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.products.map(product => (
                    <StyledTableRow stripedrows="true" hover key={product.code}>
                      <StyledTableCell component="th" scope="row"><Link to={`/products/${product.code}`}>{product.code}</Link></StyledTableCell>
                      <StyledTableCell>{product.description}</StyledTableCell>
                      <StyledTableCell>{product.status.description}</StyledTableCell>
                      <StyledTableCell align="right">{product.price}</StyledTableCell>
                      <StyledTableCell>
                        <Moment format="DD/MM/YYYY">
                          {product.creationDate}
                        </Moment>
                      </StyledTableCell>
                      <StyledTableCell>{product.user.name}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        { loadingHtml }

      </div>
    )
  }
}

export default Products;