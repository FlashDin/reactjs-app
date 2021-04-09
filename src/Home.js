import logo from "./logo.svg";
import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (<React.Fragment>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    onClick={(e) => this.props.popState(e, '', 'Post', 'post')}
                >
                    To Post
                </a>
                <a
                    className="App-link"
                    onClick={(e) => this.props.popState(e, '', 'Test', 'test')}
                >
                    Test
                </a>
            </header>
        </React.Fragment>);
    }
}

export default Home;
