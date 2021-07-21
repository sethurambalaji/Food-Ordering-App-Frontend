import React, { Fragment, Component } from 'react';

//Header component Import
import Header from "../../common/header/Header";

import './Checkout.css';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from "@material-ui/core/StepContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";

import { Redirect } from 'react-router-dom';

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
        }
    }

    render() {
        if (this.props.location.state === undefined || sessionStorage.getItem('access-token') === null) {
            return <Redirect to='/' />
        }
        return (
            <Fragment>
                <Header baseUrl={this.props.baseUrl}></Header>
                <div className='main-container'>
                    <div className='delivery-payment-section'>
                        <Stepper activeStep={this.state.activeStep} orientation='vertical'>
                            <Step key='Delivery'>
                                <StepLabel>Delivery</StepLabel>
                                <StepContent>
                                    <div>
                                        <AppBar position={"relative"}>
                                            <Tabs value={this.state.activeTabValue} variant='standard'>
                                                <Tab value='existing_address' label='EXISTING ADDRESS'
                                                />
                                                <Tab value='new_address' label='NEW ADDRESS'
                                                />
                                            </Tabs>
                                        </AppBar>
                                    </div>
                                </StepContent>
                            </Step>
                        </Stepper>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Checkout;