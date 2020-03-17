import React, { Component } from 'react';

import { Alert, AlertTitle } from '@material-ui/lab';

export class Toast extends Component {

    static TYPE_ERROR = 'error';
    static TYPE_WARNING = 'warning';
    static TYPE_INFO = 'info';
    static TYPE_SUCCESS = 'success';
    static defaultProps = {
        severity: this.TYPE_INFO,
        title: '',
        description: ''
    }

    render() {

        let title;
        if(this.props.title){
            title = <AlertTitle>{this.props.title}</AlertTitle>;
        }

        return (
            <div className="wrapper-toast">
                <Alert severity={this.props.severity}>                    
                    { title }
                    {this.props.description}
                </Alert>
            </div>
        )
    }
}

export default Toast;