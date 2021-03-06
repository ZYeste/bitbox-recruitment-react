import React, { Component } from 'react';

import api from '../api';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Toast from '../components/Toast';
import Loading from '../components/Loading';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                user: '',
                password: '',
            },
            showToast: false,
            toastSeverity: "",
            toastTitle: "",
            toastDescription: "",
            isLoading: false,
        }
    }

    handleChange(event) {
        event.preventDefault();
        let formLogin = this.state.form;
        let name = event.target.name;
        let value = event.target.value;

        formLogin[name] = value;

        this.setState({form: formLogin});
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
        api.post('login', params)
        .then(res => {
            let token = res.data;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', this.state.form.user);
            
            this.setState({
                isLoading: false, 
            });

            this.props.history.push('/products');
        })
        .catch(error => {
            console.log('submitForm() error');
            console.log(error.response);
            
            let errorTxt;

            if(error.response === undefined){
                errorTxt = 'The server is inaccessible';
            } else {
                errorTxt = error.response.data;
            }

            this.setState({
                showToast: true, 
                toastSeverity: Toast.TYPE_ERROR, 
                toastDescription: errorTxt,
                isLoading: false, 
            });
          });
    }

    render() {

        let toastHtml = (this.state.showToast) ? <Toast severity={this.state.toastSeverity} description={this.state.toastDescription} />: '';

        let loadingHtml = (this.state.isLoading) ? <Loading/>: '';

        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="wrapper-login">                        
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form noValidate onSubmit={this.onFormSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="User"
                                name="user"
                                autoComplete="user"
                                autoFocus
                                value={this.state.form.user} onChange={this.handleChange.bind(this)}/>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.form.password} onChange={this.handleChange.bind(this)}/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Sign In
                            </Button>
                        </form>
                    </div>

                </Container>

                { toastHtml }
                { loadingHtml }                
                
            </div>
        )
    }
}

export default Login;