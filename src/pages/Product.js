import React, { Component } from 'react';

import api from '../api';

import Moment from 'react-moment';

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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import AppLoginBar from '../components/AppLoginBar';
import Loading from '../components/Loading';

export class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {},
      isLoading: false,
      isShowModal: false,
      reason: '',
    }
  }

  setReason(event) {
    this.setState({
      reason: event.target.value
    });
  }

  showModal() {
    this.setState({
      isShowModal: true
    });
  }

  deactivate() {

    // Insertar de forma obligatoria una razón para desactivar el producto
    if(this.state.reason){

      this.setState({
        isShowModal: false,
        reason: '',
      });

      // const params = new URLSearchParams(this.state);
      // api.post('product/deactivate', params)
      // .then(res => {
      //     console.log('Login');
      //     console.log(res.data);
      // });
    }    
  }

  closeModal() {
    this.setState({
      isShowModal: false,
      reason: '',
    });
  }

  getProduct(id) {
    const self = this;

    this.setState({
      isLoading: true,
    });

    api.get('products/' + id)
      .then(res => {

        this.setState({
          product: res.data,
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
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    }));

    let loadingHtml = (this.state.isLoading) ? <Loading /> : '';

    let modalHtml = (!this.state.isShowModal) ? '' : <div className="modal-wrapper">
      <div className="modal">
        <div className="head">
          <span className="wrapper-title">Product</span>
        </div>
        <div className="content">
          <div>
            <p>Desactivate product?</p>

            <Grid
              container
              direction="row">
                <TextField
                  id="outlined-multiline-static"
                  className="wrapper-modal-reason"
                  label="Specify the reason for the deactivation"
                  multiline
                  rows="4"
                  variant="outlined"
                  onChange={this.setReason.bind(this)}/>
            </Grid>
          </div>

          <Grid
            container
            direction="row">

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button
                  className={classes.paper}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.closeModal.bind(this)}>
                  No
              </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  className={classes.paper}
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.deactivate.bind(this)}>
                  Yes
              </Button>
              </Grid>
            </Grid>
          </Grid>

        </div>
      </div>
    </div>;

    // Controlar que el producto ha sido cargado con la petición
    if (this.state.product.hasOwnProperty('status')) {

      // Si el producto está activo se muestra el botón
      if (product.status.id === 1) {
        deactivateButton = <Grid
          container
          direction="row">
          <Button variant="contained" onClick={() => this.showModal()}>Deactivate</Button>
        </Grid>
      }

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

        <AppLoginBar />

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
            {html}
          </Grid>
        </Grid>

        {loadingHtml}

        {modalHtml}

      </div>
    )
  }
}

export default Product;