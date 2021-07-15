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


});

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        }
    }
});



class Header extends Component {
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
                            Login
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }

}
export default withStyles(styles)(Header);