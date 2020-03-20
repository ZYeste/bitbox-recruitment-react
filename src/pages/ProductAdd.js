import React, { Component } from 'react';

import api from '../api';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AppLoginBar from '../components/AppLoginBar';

export class ProductAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
        description: '',
      }
    }
  }

  back() {
    this.props.history.push('/products');
  }

  handleChange(event) {
    event.preventDefault();
    let formLogin = this.state.form;
    let name = event.target.name;
    let value = event.target.value;

    formLogin[name] = value;

    this.setState({ form: formLogin });
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.submitForm();
  }

  submitForm() {
    const params = new URLSearchParams(this.state.form);
    this.setState({
      isLoading: true,
    });
    api.post('products/add', params)
      .then(res => {
        
        this.setState({
          isLoading: false,
        });

        this.props.history.push('/products');
      })
      .catch(error => {
        
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {

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
              justify="flex-start"
              alignItems="flex-start">
              <IconButton aria-label="back" size="small" onClick={this.back.bind(this)}>
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center">

              <Typography component="h1" variant="h5" className="wrapper-title">
                Product add
              </Typography>
            </Grid>

            <form noValidate onSubmit={this.onFormSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoFocus
                value={this.state.form.description} onChange={this.handleChange.bind(this)} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary">
                Send
              </Button>
            </form>

          </Grid>
        </Grid>

        {/* {loadingHtml}

        {modalHtml} */}

      </div>
    )
  }
}

export default ProductAdd;