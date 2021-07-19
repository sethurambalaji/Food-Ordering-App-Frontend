import React, { Component } from 'react'

//Router import for redirection.
import { Route, Switch } from "react-router-dom";

//Imports of different pages in the application
import Home from './screens/home/Home';
import Details from "./screens/details/Details";



/**
 * This class represents the whole FoodOrdering Application.
 */
class FoodOrdering extends Component {
    constructor() {
        super();
        this.baseUrl = 'http://localhost:8080/api/'
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                <Route exact path='/restaurant/:restaurantId'
                       render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
            </Switch>
        )
    }
}

export default FoodOrdering;
