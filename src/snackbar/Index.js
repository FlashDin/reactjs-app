import React, {Component} from 'react';
import './index.scss';

class Index extends Component {

    initialState = {};

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.openSnackbar) {
            this.handleSnackbar();
        }
    }

    handleSnackbar = () => {
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    };

    render() {
        return <div id="snackbar">{this.props.message}</div>;
    }
}

export default Index;
