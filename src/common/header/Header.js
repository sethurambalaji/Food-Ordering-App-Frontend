import React, { Component } from 'react'
import '../header/Header.css'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { InputLabel } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Modal } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Tab } from '@material-ui/core';
import { Tabs } from '@material-ui/core';

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


});

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});

//styles for Modal
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Tab container inside the modal
const TabContainer = function (props) {
    return (
        <Typography component="div" style={{padding: 0, textAlign: 'center'}}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}



class Header extends Component {

    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            value:0,
        }
    }

    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
        })
    }

    tabChangeHandler = (event, value) => {
        this.setState({value});
    }

    closeModalHandler =() =>{
        this.setState({isModalOpen:false})
        this.setState({value:0})    
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
                    contentlabel="Login"
                    onClose={this.closeModalHandler}
                    style={modalStyles}>
                     <Tabs className="tabs" value = {this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label='Login'/>
                        <Tab label='Register'/>
                  </Tabs>   

                </Modal>
            </div>

        )
    }

}
export default withStyles(styles)(Header);