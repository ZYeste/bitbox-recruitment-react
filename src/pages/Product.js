import React, { Component } from 'react';

import api from '../api';

import Moment from 'react-moment';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';

import AppLoginBar from '../components/AppLoginBar';

export class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      showModal: false,
      isLoading: true,
    }
  }

  deactivate() {

    console.log('Mostrar modal y enviar petición desactivar elemento al aceptar.');

    // const params = new URLSearchParams(this.state);
    // api.post('product/deactivate', params)
    // .then(res => {
    //     console.log('Login');
    //     console.log(res.data);
    // });
}

  getProduct(id) {
    let token = sessionStorage.getItem('token');
    const self = this;
    api.get('products/' + id, { headers: { Authorization: token } })
      .then(res => {

        this.setState({
          product: res.data,
          isLoading: false,
        });

      }).catch(function (error) {
        self.props.history.push('/');
      })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getProduct(id);
  }

  render() {
    
    let product = this.state.product;
    let html;
    let deactivateButton;

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

    const classes = makeStyles(theme => ({
      table: {
        minWidth: 700,
      },
    }));

    if(!this.state.isLoading){

      // Si el producto está activo se muestra el botón
      // if(product.status.id === 1){
      //   deactivateButton = <Grid
      //     container
      //     direction="row">
      //     <Button variant="contained" onClick={() => this.deactivate()}>Deactivate</Button>
      //   </Grid>
      // }

      html = <div><Grid
              container
              direction="row"
              justify="center"
              alignItems="center">
              <Grid
                container
                direction="row">
                <span>Item code: {product.code}</span>
              </Grid>
              <Grid
                container
                direction="row">
                <span xs={12}>Description: {product.description}</span>              
              </Grid>
              <Grid
                container
                direction="row">
                <span>Price(€): {product.price}</span>
              </Grid>
              <Grid
                container
                direction="row">
                <span>Creation date: <Moment format="DD/MM/YYYY">{product.creationDate}</Moment></span>
              </Grid>
              <Grid
                container
                direction="row">
                <span>Status: {product.status.description}</span>
              </Grid>
              <Grid
                container
                direction="row">
                <span>Creator: {product.user.name}</span>
              </Grid>
              {deactivateButton}
            </Grid>

            {/* Listado de proveedores */}
            <Typography component="h1" variant="h5" className="wrapper-title">
                Suppliers
              </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Supplier</StyledTableCell>
                    <StyledTableCell>Country</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {
                    product.suppliers.length ? 
                    product.suppliers.map(supplier => (
                      <StyledTableRow stripedrows="true" hover key={supplier.id}>
                        <StyledTableCell>{supplier.name}</StyledTableCell>
                        <StyledTableCell>{supplier.country}</StyledTableCell>
                      </StyledTableRow>
                    ))
                    : 
                      <StyledTableRow>
                        <StyledTableCell>No suppliers</StyledTableCell>
                      </StyledTableRow>                    
                  }
                </TableBody>
              </Table>
            </TableContainer>

            {/* Listado de reducciones de precios */}
            <Typography component="h1" variant="h5" className="wrapper-title">
                Price reductions
              </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Start date</StyledTableCell>
                    <StyledTableCell>End date</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {
                    product.priceReductions.length ? 
                    product.priceReductions.map(priceReduction => (
                      <StyledTableRow stripedrows="true" hover key={priceReduction.id}>
                        <StyledTableCell>{priceReduction.price}€</StyledTableCell>
                        <StyledTableCell>
                          <Moment format="DD/MM/YYYY">
                          {priceReduction.startDate}
                          </Moment>
                        </StyledTableCell>
                        <StyledTableCell>
                        <Moment format="DD/MM/YYYY">
                          {priceReduction.endDate}
                          </Moment>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                    : 
                      <StyledTableRow>
                        <StyledTableCell>No price reductions</StyledTableCell>
                      </StyledTableRow>                    
                  }
                </TableBody>
              </Table>
            </TableContainer>

            </div>
    }

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
                Product details
              </Typography>
            </Grid>
              { html }
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Product;