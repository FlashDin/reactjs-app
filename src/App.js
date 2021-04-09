import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import Post from './Post';
import Test from "./Test";

class App extends Component {

    components = {
        '': Home,
        home: Home,
        test: Test,
        post: Post
    };

    constructor(props) {
        super(props);
        this.state = {
            path: '',
            nextPath: ''
        };
    }

    componentDidMount() {
        this.setState({
            path: window.location.pathname.split("/").pop()
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextState.nextPath !== this.state.nextPath) {
            this.setState({
                path: nextState.nextPath
            });
        }
    }

    popState = (e, data, title, uri) => {
        e.preventDefault();
        window.history.pushState(data, title, uri);
        this.setState({
            nextPath: uri
        });
    };

    render() {
        const TagName = this.components[this.state.path];
        return (<TagName popState={this.popState.bind(this)}/>);
    }
}

export default App;
