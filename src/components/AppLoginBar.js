import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export class AppLoginBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }
  }

  getLoggedUser(){
    if (window.sessionStorage) {
      this.setState({
        user: window.sessionStorage.getItem('user')
      });
    }
  }

  componentDidMount() {
    this.getLoggedUser();
  }

  render() {
    return (
      <div>                
        <AppBar position="static">            
          <Toolbar>              
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center">                    
              <IconButton aria-label="show 4 new mails" color="inherit">
                <AccountBoxIcon />{this.state.user}
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default AppLoginBar;