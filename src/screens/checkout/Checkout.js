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
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Redirect } from 'react-router-dom';

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            activeTabValue: 'existing_address',
            addresses: [],
            states: [],
            selectedAddressId: undefined,
            flat: '',
            flatRequired: false,
            locality: '',
            localityRequired: false,
            city: '',
            cityRequired: false,
            stateUUID: '',
            stateUUIDRequired: false,
            pincode: '',
            pincodeRequired: false,
            pincodeValid: true,
            displayChange: 'display-none',
        }
    }

    componentDidMount() {
        if (this.props.location.state !== undefined && sessionStorage.getItem('access-token') !== null) {
            this.fetchAddress();
            this.fetchStates();
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

    fetchStates = () => {
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({ states: JSON.parse(this.responseText).states });
            }
        });

        let url = this.props.baseUrl + 'states/';
        xhr.open('GET', url);
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

    onInputFieldChangeHandler = (e) => {
        let stateKey = e.target.id;
        let stateValue = e.target.value;
        //Material UI Select doesn't return key
        if (stateKey === undefined) {
            stateKey = 'stateUUID';
        }
        //Form validation.
        let stateValueRequiredKey = stateKey + 'Required';
        let stateKeyRequiredValue = false;
        if (stateValue === '') {
            stateKeyRequiredValue = true;
        }
        let validPincode = this.state.pincodeValid;
        if (stateKey === 'pincode') {
            validPincode = this.validatePincode(stateValue);
        }
        this.setState({
            [stateKey]: stateValue,
            [stateValueRequiredKey]: stateKeyRequiredValue,
            'pincodeValid': validPincode
        });
    }

    validatePincode = (pincode) => {
        if (pincode !== undefined && pincode.length !== 6) {
            return false;
        } else if (!isNaN(pincode) && pincode.length === 6) {
            return true;
        } else {
            return false;
        }
    }

    saveAddress = () => {
        let tempCityRequired = false;
        let tempPincodeRequired = false;
        let tempFlatRequired = false;
        let tempStateRequired = false;
        let tempLocalityRequired = false;
        if (this.state.city === '' || this.state.cityRequired) {
            tempCityRequired = true;
        }
        if (this.state.locality === '' || this.state.localityRequired) {
            tempLocalityRequired = true;
        }
        if (this.state.flat === '' || this.state.flatRequired) {
            tempFlatRequired = true;
        }
        if (this.state.stateUUID === '' || this.state.stateUUIDRequired) {
            tempStateRequired = true;
        }
        if (this.state.pincode === '' || this.state.pincodeRequired) {
            tempPincodeRequired = true;
        }
        if (tempFlatRequired || tempPincodeRequired || tempStateRequired || tempLocalityRequired || tempCityRequired) {
            this.setState({
                flatRequired: tempFlatRequired,
                localityRequired: tempLocalityRequired,
                cityRequired: tempCityRequired,
                stateUUIDRequired: tempStateRequired,
                pincodeRequired: tempPincodeRequired
            })
            return;
        }

        let address = {
            city: this.state.city,
            flat_building_name: this.state.flat,
            locality: this.state.locality,
            pincode: this.state.pincode,
            state_uuid: this.state.stateUUID
        }

        let token = sessionStorage.getItem('access-token');
        let xhr = new XMLHttpRequest();
        let that = this;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    addresses: JSON.parse(this.responseText).addresses,
                    city: '',
                    locality: '',
                    flat: '',
                    stateUUID: '',
                    pincode: ''
                });
            }
        });

        let url = this.props.baseUrl + 'address/';
        xhr.open('POST', url);
        xhr.setRequestHeader('authorization', 'Bearer ' + token);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.send(JSON.stringify(address));
    }

    incrementActiveStep = () => {
        if (this.state.activeStep === 0 && this.state.selectedAddressId === undefined) {
        } else if (this.state.activeStep === 1 && this.state.paymentId === '') {
        } else {
            let activeState = this.state.activeStep + 1;
            let changeAddressPayment = 'display-none';
            if (activeState === 2) {
                changeAddressPayment = 'display-block';
            }
            this.setState({ activeStep: activeState, displayChange: changeAddressPayment })
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
                                    <div id='new-address-display'
                                        className={this.state.activeTabValue === 'new_address' ? 'display-block' : 'display-none'}>
                                        <FormControl style={{ minWidth: 300 }}>
                                            <InputLabel htmlFor='flat'>Flat/Building No</InputLabel>
                                            <Input id='flat' name='flat' type='text' value={this.state.flat}
                                                flat={this.state.flat}
                                                onChange={this.onInputFieldChangeHandler} />
                                            {this.state.flatRequired ? <FormHelperText>
                                                <span style={{ color: "red" }}>required</span>
                                            </FormHelperText> : null}
                                        </FormControl>
                                        <br />
                                        <FormControl style={{ minWidth: 300 }}>
                                            <InputLabel htmlFor='locality'>Locality</InputLabel>
                                            <Input id='locality' name='locality' type='text' value={this.state.locality}
                                                locality={this.state.locality}
                                                onChange={this.onInputFieldChangeHandler} />
                                            {this.state.localityRequired ? <FormHelperText>
                                                <span style={{ color: "red" }}>required</span>
                                            </FormHelperText> : null}
                                        </FormControl>
                                        <br />
                                        <FormControl style={{ minWidth: 300 }}>
                                            <InputLabel htmlFor='city'>City</InputLabel>
                                            <Input id='city' name='city' type='text' value={this.state.city}
                                                city={this.state.city}
                                                onChange={this.onInputFieldChangeHandler} />
                                            {this.state.cityRequired ? <FormHelperText>
                                                <span style={{ color: "red" }}>required</span>
                                            </FormHelperText> : null}
                                        </FormControl>
                                        <br />
                                        <FormControl style={{ minWidth: 300 }}>
                                            <InputLabel htmlFor='stateUUID'>State</InputLabel>
                                            <Select id='stateUUID' name='stateUUID' value={this.state.stateUUID}
                                                onChange={this.onInputFieldChangeHandler}>
                                                {this.state.states.map((state, index) => (
                                                    <MenuItem key={state.id} value={state.id}>{state.state_name}</MenuItem>
                                                ))}
                                            </Select>
                                            {this.state.stateUUIDRequired ? <FormHelperText>
                                                <span style={{ color: "red" }}>required</span>
                                            </FormHelperText> : null}
                                        </FormControl>
                                        <br />
                                        <FormControl style={{ minWidth: 300 }}>
                                            <InputLabel htmlFor='pincode'>Pincode</InputLabel>
                                            <Input id='pincode' name='pincode' type='text' value={this.state.pincode}
                                                pincode={this.state.pincode}
                                                onChange={this.onInputFieldChangeHandler} />
                                            {this.state.pincodeRequired ? <FormHelperText>
                                                <span style={{ color: "red" }}>required</span>
                                            </FormHelperText> : null}
                                            {!this.state.pincodeRequired && !this.state.pincodeValid ? <FormHelperText>
                                                <span style={{ color: "red" }}>Pincode must contain only numbers and must be 6 digits long</span>
                                            </FormHelperText> : null}
                                        </FormControl>
                                        <br />
                                        <br />
                                        <FormControl style={{ minWidth: 150 }}>
                                            <Button variant='contained' color='secondary' onClick={this.saveAddress}>SAVE
                                                ADDRESS</Button>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button style={{ margin: 5 }} disabled={this.state.activeStep === 0}>Back</Button>
                                        <Button style={{ margin: 5 }} className='button' variant="contained" color="primary"
                                            onClick={this.incrementActiveStep}>Next</Button>
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