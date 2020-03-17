import React, { Component } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

export class Loading extends Component {

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

        return (
            <div className="wrapper-loading">
                <CircularProgress/>
            </div>
        )
    }
}

export default Loading;


