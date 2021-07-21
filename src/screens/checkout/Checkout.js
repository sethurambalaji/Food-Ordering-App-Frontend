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
            addresses: [],
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined && sessionStorage.getItem('access-token') !== null) {
            this.fetchAddress();
        }
    }

    changeActiveTab = (value) => {
        this.setState({ activeTabValue: value })
        if (value === 'existing_address') {
            this.fetchAddress();
        }
    }

    fetchAddress = () => {
        let token = sessionStorage.getItem('access-token');

        let xhr = new XMLHttpRequest();

        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ addresses: JSON.parse(this.responseText).addresses });
            }
        });

        let url = this.props.baseUrl + 'address/customer';

        xhr.open('GET', url);

        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader("Cache-Control", "no-cache");

        xhr.send();
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
                                    <div id='existing-address-display'
                                        className={this.state.activeTabValue === 'existing_address' ? 'display-block' : 'display-none'}>
                                        {
                                            this.state.addresses === undefined || this.state.addresses.length === 0 ?
                                                <Typography style={{ margin: 10, marginBottom: 200 }} color='textSecondary'
                                                    component='p'>
                                                    There are no saved addresses! You can save an address using the 'New
                                                    Address' tab or using your ‘Profile’ menu option.
                                                </Typography> : null
                                        }
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