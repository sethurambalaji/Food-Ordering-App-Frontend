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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Redirect } from 'react-router-dom';

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
            addresses: [],
            selectedAddressId: undefined,
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

    selectAddress = (e) => {
        let elementId = e.target.id;
        if (elementId.startsWith('select-address-icon-')) {
            this.setState({ selectedAddressId: elementId.split('select-address-icon-')[1] });
        }
        if (elementId.startsWith('select-address-button-')) {
            this.setState({ selectedAddressId: elementId.split('select-address-button-')[1] })
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
                                                    onClick={() => this.changeActiveTab('existing_address')} />
                                                <Tab value='new_address' label='NEW ADDRESS'
                                                    onClick={() => this.changeActiveTab('new_address')} />
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
                                                </Typography> :

                                                <GridList style={{ flexWrap: 'nowrap' }} cols={3} cellHeight='auto'>
                                                    {
                                                        (this.state.addresses || []).map((address, index) => (
                                                            <GridListTile key={address.id}
                                                                className={this.state.selectedAddressId === address.id ? 'grid-list-tile-selected-address' : null}>
                                                                <div className='address-box'>
                                                                    <p>{address.flat_building_name}</p>
                                                                    <p>{address.locality}</p>
                                                                    <p>{address.city}</p>
                                                                    <p>{address.state.state_name}</p>
                                                                    <p>{address.pincode}</p>
                                                                </div>
                                                                <Grid container>
                                                                    <Grid item xs={6} lg={10}></Grid>
                                                                    <Grid item xs={2}>
                                                                        <IconButton
                                                                            id={'select-address-button-' + address.id}
                                                                            className='select-address-icon'
                                                                            onClick={this.selectAddress}>
                                                                            <CheckCircleIcon
                                                                                id={'select-address-icon-' + address.id}
                                                                                className={this.state.selectedAddressId === address.id ? 'display-green-icon' : 'display-grey-icon'} />
                                                                        </IconButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </GridListTile>
                                                        ))
                                                    }
                                                </GridList>
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