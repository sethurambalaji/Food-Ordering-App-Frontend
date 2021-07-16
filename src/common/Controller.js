import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../screens/home/Home';
class Controller extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" render={({ history }, props) => <Home {...props} baseUrl={this.baseUrl} history={history} />} />
                </Switch>
            </Router>
        )

    }
}
export default Controller;