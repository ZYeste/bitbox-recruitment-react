import React, { Component } from 'react';

import api from '../api';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
        }
    }

    handleChange(event) {
        event.preventDefault();
        let form = this.state;
        let name = event.target.name;
        let value = event.target.value;

        form[name] = value;

        this.setState(form);
    }

    onFormSubmit = e => {
        e.preventDefault();
        this.submitForm();
    }

    submitForm() {
        const params = new URLSearchParams(this.state);
        api.post('login', params)
        .then(res => {
            let token = res.data;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', this.state.user);
            
            this.props.history.push('/products');
        });
    }

    render() {

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
                                value={this.state.user} onChange={this.handleChange.bind(this)}/>
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
                                value={this.state.password} onChange={this.handleChange.bind(this)}/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary">
                                Sign In
                            </Button>
                        </form>
                    </div>
                    <Box mt={8}>
                    </Box>
                </Container>
            </div>
        )
    }
}

export default Login;