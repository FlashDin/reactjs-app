import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import TestRouter from "./TestRouter";
import PostRouterDom from "./PostRouterDom";

class AppRouterDom extends Component {

    popState = (e, data, title, uri) => {

    };

    render() {
        return (<BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/test" exact component={TestRouter}/>
                <Route path="/post" exact component={PostRouterDom}/>
                <Route component={<React.Fragment>NOT FOUND</React.Fragment>}/>
            </Switch>
        </BrowserRouter>);
    }
}

export default AppRouterDom;
