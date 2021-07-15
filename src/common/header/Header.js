import React, { Component } from 'react'
import '../header/Header.css'

import { AccountCircle } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import { Tab } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import validator from 'validator'
const styles = theme => ({

    grow: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#263238',
        boxShadow: 'none',
    },
    root: {
        flexGrow: 1,
        minWidth: 240,
    },

    headerElements: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },

    },
    logoContainer: {},
    searchBoxContainer: {},
    searchBox: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '30ch',
    },
    loginContainer: {},
    headerLoginBtn: {
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

});

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});




// Tab container inside the modal
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};



class Header extends Component {

    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            value: 0,
            contactno: "",
            password: "",
            contactnoRequired: "dispNone",
            passwordRequired: "dispNone",
            firstname: "",
            firstnameRequired: "dispNone",
            lastname: "",
            email: "",
            emailRequired: "dispNone",
            emailError: "dispNone",
            passwordregister: "",
            passwordRegisterRequired: "dispNone",
            contactNoSignup: "",
            contactNoSignupRequired: "dispNone",

        }
    }

    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
        })
    }

    tabChangeHandler = (_event, value) => {
        this.setState({ value });
    }

    closeModalHandler = () => {
        this.setState({
            isModalOpen: false,
            value: 0
        })
        this.resetLoginForm();
        this.resetSignupForm();

    }

    resetLoginForm = () => {
        this.setState({ contactno: "" })
        this.setState({ password: "" })
        this.setState({ contactnoRequired: 'dispNone' })
        this.setState({ passwordRequired: 'dispNone' })
    }

    resetSignupForm = () => {
        console.log(this.state.passwordregister);
        console.log(this.state.passwordRegisterRequired);
        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            passwordregister: "",
            contactNo: "",
            contactNoSignup:"",
            firstnameRequired: 'dispNone',
            passwordRegisterRequired: 'dispNone',
            contactNoSignupRequired: 'dispNone',
            emailRequired: 'dispNone',
            emailError: "dispNone",
        })
    }

    loginValidationHandler = () => {
        this.state.contactno === "" ? this.setState({ contactnoRequired: 'dispBlock' }) : this.setState({ contactnoRequired: 'dispNone' });
        this.state.password === "" ? this.setState({ passwordRequired: 'dispBlock' }) : this.setState({ passwordRequired: 'dispNone' });
    }

    contactnoInputChangeHandler = (e) => {
        this.setState({ contactno: e.target.value })
    }

    passwordInputChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    registerValidationHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: 'dispBlock' }) : this.setState({ firstnameRequired: 'dispNone' })
        this.validateEmail();
        this.state.passwordregister === "" ? this.setState({ passwordRegisterRequired: 'dispBlock' }) : this.setState({ passwordRegisterRequired: 'dispNone' })
        this.state.contactNoSignup === "" ? this.setState({ contactNoSignupRequired: 'dispBlock' }) : this.setState({ contactNoSignupRequired: 'dispNone' })

    }


    validateEmail = () => {
        let email = this.state.email;
        email === "" ? this.setState({ emailRequired: 'dispBlock' }) : this.setState({ emailRequired: 'dispNone' })
       console.log(this.state.emailRequired)
       validator.isEmail(email)? this.setState({ emailError: "dispNone" }):this.setState({ emailError: "dispBlock" });
    }

    firstnameInputChangeHandler = (e) => {
        this.setState({ firstname: e.target.value })
    }

    lastnameInputChangeHandler = (e) => {
        this.setState({ lastname: e.target.value })
    }

    emailInputChangeHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    passwordRegisterInputChangeHandler = (e) => {
        this.setState({ passwordregister: e.target.value })
    }

    contactNoSignupInputChangeHandler = (e) => {
        this.setState({ contactNoSignup: e.target.value })
    }



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.headerElements}>
                        <div className={classes.logoContainer}>
                            <IconButton disableRipple={true} edge="start" color="inherit"
                                aria-label="app logo">
                                <FastfoodIcon />
                            </IconButton>
                        </div>
                        <div className={classes.searchBoxContainer}>
                            <div className={classes.searchBox}>
                                <MuiThemeProvider theme={theme}>
                                    <InputLabel htmlFor="search-box-input" />
                                    <Input id="search-box-input"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        placeholder="Search by Restaurant Name"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                    />
                                </MuiThemeProvider>
                            </div>
                        </div>
                        <div className={classes.loginContainer}>
                            <div className={classes.headerLoginBtn}>
                                <Button variant="contained" color="default" startIcon={<AccountCircle />}
                                    onClick={this.openModalHandler}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Modal
                    aria-hidden={false}
                    open={this.state.isModalOpen}
                    aria-labelledby="Login"
                    onClose={this.closeModalHandler}
                    style={customStyles}
                    className={classes.modal}>
                    <div className={classes.paper}>
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label='LOGIN' />
                            <Tab label='SIGNUP' />
                        </Tabs><br />
                        {
                            this.state.value === 0 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                    <Input id="contactno" type="tel" contactno={this.state.contactno} onChange={this.contactnoInputChangeHandler} />
                                    <FormHelperText className={this.state.contactnoRequired}>
                                        <span className='redError'>required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" password={this.state.password} onChange={this.passwordInputChangeHandler} />
                                    <FormHelperText className={this.state.passwordRequired}>
                                        <span className='redError'>required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />
                                <Button variant='contained' color='primary'
                                    style={{ textAlign: 'center' }}
                                    onClick={this.loginValidationHandler}
                                    id="loginButton"
                                >Login</Button>
                            </TabContainer>

                        }

                        {
                            this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname}
                                        onChange={this.firstnameInputChangeHandler}
                                    />
                                    <FormHelperText className={this.state.firstnameRequired}>
                                        <span className="redError">required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />
                                <FormControl>
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname}
                                        onChange={this.lastnameInputChangeHandler}
                                    />
                                </FormControl><br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="email" email={this.state.email}
                                        onChange={this.emailInputChangeHandler}
                                    />
                                    <FormHelperText>
                                        {
                                        this.state.emailRequired==="dispBlock"
                                        ?
                                         <span className="redError" >required</span>
                                         :
                                         (this.state.emailError==='dispBlock'?
                                         <span className="redError">Invalid Email</span>:
                                         null)
                                        }
                                       
                                        
                                        
                                    </FormHelperText>
                                </FormControl><br /><br/>

                                <FormControl required>
                                    <InputLabel htmlFor="passwordregister">Password</InputLabel>
                                    <Input id="passwordregister" type="password" passwordregister={this.state.passwordregister}
                                        onChange={this.passwordRegisterInputChangeHandler}
                                    />
                                    <FormHelperText className={this.state.passwordRegisterRequired}>
                                        <span className="redError">required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />

                                <FormControl required>
                                    <InputLabel htmlFor="contactNoSignup">Contact No</InputLabel>
                                    <Input id="contactNoSignup" type="tel" contactno={this.state.contactNoSignup}
                                        onChange={this.contactNoSignupInputChangeHandler}
                                    />
                                    <FormHelperText className={this.state.contactNoSignupRequired}>
                                        <span className="redError">required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />
                                <Button id="registerButton" variant="contained" color="primary" onClick={this.registerValidationHandler}>Register</Button>
                            </TabContainer>
                        }


                    </div>
                </Modal>
            </div>

        )
    }

}
export default withStyles(styles)(Header);