import React, { Component } from 'react'
import '../header/Header.css'
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import { Tab } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
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
        flexGrow: 1,
        flex: 1,
        flexBasis: '100%',
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
    FormControl: {
        minWidth: '-webkit-fill-available',
    },
    customerProifleBtn: {
        color: 'grey',
        [theme.breakpoints.only('xs')]: {
            marginBottom: theme.spacing(1.5),
        },
    },


});

//Theme for changing white underline on Search box input
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

// Set Tab Container Required Prototypes
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

//Modal styles
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

// Header Section UI
class Header extends Component {

    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            value: 0,

            contactno: "",
            isLoginContactnoError: "dispNone",
            loginContactnoErrorMeassage: "required",

            password: "",
            isloginPasswordError: "dispNone",
            loginPasswordErrorMessage: "required",

            contactnoRequired: "dispNone",
            passwordRequired: "dispNone",

            firstname: "",
            firstnameRequired: "dispNone",

            lastname: "",
            email: "",
            passwordregister: "",
            contactNoSignup: "",

            isSignupEmailError: "dispNone",
            signupEmailErrorMessage: "required",

            isSignupPasswordError: "dispNone",
            signupPasswordErrorMessage: "required",

            isSignupContactnoError: "dispNone",

            openSnackBar: false,

            isLoginError: false,
            loginErrorMessage: "",
            loginErrorMessageRequired: "dispBlock",

            isLoggedIn: sessionStorage.getItem("access-token") == null ? false : true,

            signupErrorMessage: "",
            isSignUpError: "dispNone",

            menuState: false,
            anchorEl: null,
        }
    }

    //Open Modal Handler
    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
        })
    }

    //Tab Change Handlerr
    tabChangeHandler = (_event, value) => {
        this.setState({ value });
    }

    //close Modal handler
    closeModalHandler = () => {
        this.setState({
            isModalOpen: false,
            value: 0
        })
        this.resetLoginForm(); // Clear Login Form Fields
        this.resetSignupForm(); // Clear Signup Form Fields

    }

    //reset Login form
    resetLoginForm = () => {
        this.setState({ contactno: "" })
        this.setState({ password: "" })
        this.setState({ contactnoRequired: 'dispNone' })
        this.setState({ passwordRequired: 'dispNone' })
        this.setState({
            isLoginContactnoError: "dispNone",
            loginContactnoErrorMeassage: "required",
            isloginPasswordError: "dispNone",
            loginPasswordErrorMessage: "required",

            isLoginError: false,
            loginErrorMessage: "",
            loginErrorMessageRequired: "dispBlock",

        })
    }

    //reset Sign up form
    resetSignupForm = () => {
        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            passwordregister: "",
            contactNo: "",
            contactNoSignup: "",
            firstnameRequired: 'dispNone',
            isSignupEmailError: "dispNone",
            signupEmailErrorMessage: "required",
            isSignupPasswordError: "dispNone",
            signupPasswordErrorMessage: "required",
            isSignupContactnoError: 'dispNone',
            signupContactnoErrorMessage: "required",

            signupErrorMessage: "",
            isSignUpError: "dispNone",
        })
    }

    //Login validation
    loginValidationHandler = () => {
        let isValidContactno = this.validateLoginContactNo()
        let isValidLoginPassword = this.validateLoginPassword()
        if (isValidContactno && isValidLoginPassword) {
            this.login()
        }
        else {
            this.setState({
                isLoginError: false,
                loginErrorMessage: "",
                loginErrorMessageRequired: "dispBlock",
            })
        }

    }

    //Login API call
    login = () => {
        let loginData = null;
        let that = this;
        let xhrLogin = new XMLHttpRequest();
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let loginResponse = JSON.parse(this.responseText);
                // displays the login error message
                if (this.status === 401) {
                    that.setState({
                        loginErrorMessage: loginResponse.message,
                        loginErrorMessageRequired: "dispBlock"
                    });
                }
                // after successful login stores uuid, access-token, first-name inside session storage
                if (this.status === 200) {
                    sessionStorage.setItem("uuid", loginResponse.id);
                    sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                    sessionStorage.setItem("first-name", loginResponse.first_name)
                    that.setState({
                        isLoggedIn: true,

                    });
                    //closes the modal after successful login
                    that.closeModalHandler();
                }
            }
        });
        let url = 'http://localhost:8080/api/customer/login';
        xhrLogin.open("Post", url);
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.contactno + ":" + this.state.password));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(loginData);
    }

    //validate contact number in login form
    validateLoginContactNo = () => {
        let contactno = this.state.contactno
        let isValidContactno = contactno.length > 0 ?
            (validator.isMobilePhone(contactno) && contactno.length === 10 ? true : false)
            :
            false
        isValidContactno ? this.setState({ isLoginContactnoError: "dispNone" }) : this.setState({ isLoginContactnoError: "dispBlock" })
        let errorMessage = !contactno.length > 0
            ?
            "required"
            :
            "Invalid Contact"
        this.setState({ loginContactnoErrorMeassage: errorMessage })
        return isValidContactno;
    }

    //validate password in login form
    validateLoginPassword = () => {
        let password = this.state.password
        let isValidPassword = password.length > 0 ? true : false
        isValidPassword ? this.setState({ isloginPasswordError: "dispNone" }) : this.setState({ isloginPasswordError: "dispBlock" })
        let errorMessage = "required"
        this.setState({ loginPasswordErrorMessage: errorMessage })
        return isValidPassword
    }

    //login form - contact number input change handler
    contactnoInputChangeHandler = (e) => {
        this.setState({ contactno: e.target.value })
    }

    //login form - password Handler
    passwordInputChangeHandler = (e) => {
        this.setState({ password: e.target.value })
    }

    //Signup form Validation
    registerValidationHandler = () => {
        let isSignupIFirstNameValid = this.validateSignupFirstName();
        let isSignupEmailValid = this.validateEmail();
        let isSignupPasswordValid = this.validateSignupPassword();
        let isSignupContactnoValid = this.validateContactnoSignUp();
        if (isSignupIFirstNameValid && isSignupEmailValid && isSignupPasswordValid && isSignupContactnoValid)
            this.signup();
        else {
            this.setState({
                signupErrorMessage: "",
                isSignUpError: "dispNone",
            })
        }

    }

    //Sign up - API call
    signup = () => {
        let signupData = JSON.stringify({
            "contact_number": this.state.contactNoSignup,
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "password": this.state.passwordregister
        });

        let that = this;
        let xhrSignup = new XMLHttpRequest();
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let responseText = JSON.parse(this.responseText);
                // displays the signup error message
                if (this.status === 400) {
                    that.setState({
                        signupErrorMessage: responseText.message,
                        isSignUpError: "dispBlock",
                    });
                }
                // after successful signup tab changes to login tab inside the modal and displays the signup snackbar
                if (this.status === 201) {
                    that.setState({
                        value: 0,
                        openSnackBar: true,
                    });
                    that.resetSignupForm();
                }
            }
        });
        let url = 'http://localhost:8080/api/customer/signup'
        xhrSignup.open("POST", url);
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(signupData);
    }

    //Close snack bar handler
    handleCloseSnackBar = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ openSnackBar: false });
    };

    //Signup form validation
    validateSignupFirstName = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: 'dispBlock' }) : this.setState({ firstnameRequired: 'dispNone' })
        return this.state.firstnameRequired === "dispBlock" ? false : true;
    }

    //SIgnup form - email validation
    validateEmail = () => {
        let email = this.state.email;
        let isValidEmail = email.length > 0 ?
            (validator.isEmail(email) ? true : false)
            :
            false
        isValidEmail ? this.setState({ isSignupEmailError: "dispNone" }) : this.setState({ isSignupEmailError: "dispBlock" });
        let errorMessage = !email.length > 0 ? "required" : "Invalid Email"
        this.setState({ signupEmailErrorMessage: errorMessage })
        return isValidEmail;
    }

    //Sign up Form - Password Validation
    validateSignupPassword = () => {
        let password = this.state.passwordregister;
        let isValidPassword = password.length > 0 ?
            (validator.isStrongPassword(password) ? true : false)
            :
            false
        isValidPassword ? this.setState({ isSignupPasswordError: "dispNone" }) : this.setState({ isSignupPasswordError: "dispBlock" })
        let errorMessage = !password.length > 0
            ?
            "required"
            :
            "Password must contain at least one capital letter, one small letter, one number, and one special character"
        this.setState({ signupPasswordErrorMessage: errorMessage })
        return isValidPassword;
    }

    //Sign up form - Contact no Validation
    validateContactnoSignUp = () => {
        let contactno = this.state.contactNoSignup;
        let isValidContactno = contactno.length > 0 ?
            (validator.isMobilePhone(contactno) && contactno.length === 10 ? true : false)
            :
            false
        isValidContactno ? this.setState({ isSignupContactnoError: "dispNone" }) : this.setState({ isSignupContactnoError: "dispBlock" })
        let errorMessage = !contactno.length > 0
            ?
            "required"
            :
            "Contact No. must contain only numbers and must be 10 digits long"
        this.setState({ signupContactnoErrorMessage: errorMessage })
        return isValidContactno;

    }

    //Sign up form - first name validation
    firstnameInputChangeHandler = (e) => {
        this.setState({ firstname: e.target.value })
    }

    //signup form- Last name reuired validation only
    lastnameInputChangeHandler = (e) => {
        this.setState({ lastname: e.target.value })
    }

    //Sign up form- Email validation
    emailInputChangeHandler = (e) => {
        this.setState({ email: e.target.value })
    }

    //Sign up Form - password Input change Handler
    passwordRegisterInputChangeHandler = (e) => {
        this.setState({ passwordregister: e.target.value })
    }

    //Sign up Form - COntact number input change handler
    contactNoSignupInputChangeHandler = (e) => {
        this.setState({ contactNoSignup: e.target.value })
    }

    //Sign up Form - SearchContent Handler
    searchContentHandler = (e) => {
        this.props.searchImage(e.target.value);
        e.preventDefault();
    }

    //Profile icon click handler
    onProfileIconClick = (e) => {
        this.setState({ 'menuState': !this.state.menuState, 'anchorEl': e.currentTarget });
    }

    //Menu Items close handler
    onMenuClose = () => {
        this.setState({ 'menuState': !this.state.menuState, 'anchorEl': null });
    }

    // redirects to profile page when customer clicks on My Profile inside the menu
    onMyProfile = () => {
        this.setState({
            isLoggedIn: true
        });
    }

    // when customer clicks on logout inside the menu remove's access-token, uuid, first-name from sessionStorage and redirects to home page and closes the menu
    onLogout = () => {
        sessionStorage.removeItem('access-token');
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('first-name');
        this.setState({
            isLoggedIn: false
        })
        this.onMenuClose();
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar className={classes.headerElements}>

                        {/* Logo */}
                        <div className={classes.logoContainer}>
                            <IconButton disableRipple={true} edge="start" color="inherit"
                                aria-label="app logo">
                                <FastfoodIcon />
                            </IconButton>
                        </div>

                        {/* Search Box */}
                        {this.props.showSearchBox ?
                            <div className={classes.searchBox}>
                                <ThemeProvider theme={theme}>
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
                                        onChange={this.props.searchHandler}
                                    />
                                </ThemeProvider>
                            </div>
                            : null
                        }

                        {/* Profile Picture Icon */}
                        <div className={classes.loginContainer}>
                            {!this.state.isLoggedIn ?

                                /* User Not Logged in */
                                <div className={classes.headerLoginBtn}>
                                    <Button variant="contained" color="default" startIcon={<AccountCircle />}
                                        onClick={this.openModalHandler}>
                                        Login
                                    </Button>
                                </div>
                                :

                                // When User Logged in
                                <div className={classes.customerProifleBtn}>
                                    <Button id="customer-profile" startIcon={<AccountCircle />}
                                        onClick={this.onProfileIconClick}
                                    >
                                        {sessionStorage.getItem("first-name")}
                                    </Button>

                                    {/* Menu */}
                                    <Menu id="profile-menu" open={this.state.menuState} onClose={this.onMenuClose}
                                        anchorEl={this.state.anchorEl} getContentAnchorEl={null}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "left" }} keepMounted>

                                        {/* Profile */}
                                        <MenuItem style={{ minHeight: 48 }}>
                                            <Typography>
                                                <Link
                                                    to={"/profile"} style={{ textDecoration: 'none', color: 'black' }}
                                                    onClick={this.onMyProfile}>
                                                    My Profile
                                                </Link></Typography></MenuItem>

                                        {/* Logout */}
                                        <MenuItem style={{ minHeight: 48 }}>
                                            <Typography>
                                                <Link to={"/"} style={{ textDecoration: 'none', color: 'black' }}
                                                    onClick={this.onLogout}>
                                                    Logout
                                                </Link>
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }
                        </div>
                    </Toolbar>
                </AppBar>

                {/* Modal for login and sign Up */}
                <Modal
                    aria-hidden={false}
                    open={this.state.isModalOpen}
                    aria-labelledby="Login"
                    onClose={this.closeModalHandler}
                    style={customStyles}
                    className={classes.modal}>
                    <div className={classes.paper}>

                        {/* Tabs */}
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label='LOGIN' />
                            <Tab label='SIGNUP' />
                        </Tabs><br />

                        {/* Login Tab Container */}
                        {
                            this.state.value === 0 &&
                            <TabContainer>

                                {/* Contact No */}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="contactno">Contact No</InputLabel>
                                    <Input id="contactno" type="tel" contactno={this.state.contactno}
                                        onChange={this.contactnoInputChangeHandler}
                                        value={this.state.contactno}
                                    />
                                    <FormHelperText className={this.state.isLoginContactnoError}>
                                        <span className='redError'>{this.state.loginContactnoErrorMeassage}</span>
                                    </FormHelperText>
                                </FormControl><br /><br />

                                {/* Password */}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" password={this.state.password}
                                        onChange={this.passwordInputChangeHandler}
                                        value={this.state.password}
                                    />
                                    <FormHelperText className={this.state.isloginPasswordError}>
                                        <span className='redError'>{this.state.loginPasswordErrorMessage}</span>
                                    </FormHelperText>

                                    {/* Login Error on API call */}
                                    <FormHelperText className={this.state.loginErrorMessageRequired}>
                                        <span className='redError'>{this.state.loginErrorMessage}</span>
                                    </FormHelperText>

                                </FormControl><br /><br />

                                {/* Login Button */}
                                <Button variant='contained' color='primary'
                                    style={{ textAlign: 'center' }}
                                    onClick={this.loginValidationHandler}
                                    id="loginButton"
                                >Login</Button>
                            </TabContainer>

                        }

                        {/* Sign Up Tab Container */}
                        {
                            this.state.value === 1 &&
                            <TabContainer>

                                {/* First Name */}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname}
                                        onChange={this.firstnameInputChangeHandler}
                                        value={this.state.firstname}
                                    />
                                    <FormHelperText className={this.state.firstnameRequired}>
                                        <span className="redError">required</span>
                                    </FormHelperText>
                                </FormControl><br /><br />

                                {/* Last Name */}
                                <FormControl className={classes.FormControl}>
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname}
                                        onChange={this.lastnameInputChangeHandler}
                                        value={this.state.lastname}
                                    />
                                </FormControl><br /><br />

                                {/* Email */}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="email" email={this.state.email}
                                        onChange={this.emailInputChangeHandler}
                                        value={this.state.email}
                                    />
                                    <FormHelperText className={this.state.isSignupEmailError}>
                                        <span className="redError" >{this.state.signupEmailErrorMessage}</span>
                                    </FormHelperText>
                                </FormControl><br /><br />

                                {/*Password*/}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="passwordregister">Password</InputLabel>
                                    <Input id="passwordregister" type="password" passwordregister={this.state.passwordregister}
                                        onChange={this.passwordRegisterInputChangeHandler}
                                        value={this.state.passwordregister}
                                    />
                                    <FormHelperText className={this.state.isSignupPasswordError}>
                                        <span className="redError">{this.state.signupPasswordErrorMessage}</span>
                                    </FormHelperText>
                                </FormControl><br /><br />

                                {/* Contact No */}
                                <FormControl className={classes.FormControl} required>
                                    <InputLabel htmlFor="contactNoSignup">Contact No</InputLabel>
                                    <Input id="contactNoSignup" type="tel" contactno={this.state.contactNoSignup}
                                        onChange={this.contactNoSignupInputChangeHandler}
                                        value={this.state.contactNoSignup}
                                    />
                                    <FormHelperText className={this.state.isSignupContactnoError}>
                                        <span className="redError">{this.state.signupContactnoErrorMessage}</span>
                                    </FormHelperText>

                                    {/* SIgn Up error message on API call  */}
                                    <FormHelperText className={this.state.isSignUpError}>
                                        <span className='redError'>{this.state.signupErrorMessage}</span>
                                    </FormHelperText>
                                </FormControl><br /><br />
                                <Button id="registerButton" variant="contained" color="primary" onClick={this.registerValidationHandler}>Register</Button>
                            </TabContainer>
                        }

                        {/* Snack Bar - "Registration Successful" */}
                        {this.state.openSnackBar ?
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                open={this.state.openSnackBar}
                                autoHideDuration={6000}
                                onClose={this.handleCloseSnackBar}
                                message="Registered successfully! Please login now!"
                                action={
                                    <React.Fragment>
                                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleCloseSnackBar}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </React.Fragment>
                                }
                            />
                            :
                            null
                        }
                    </div>
                </Modal>
            </div>

        )
    }

}
export default withStyles(styles)(Header);
