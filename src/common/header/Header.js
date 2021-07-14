import React, { Component } from 'react'
import '../header/Header.css'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { IconButton } from '@material-ui/core';
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
    logoContainer:{},
    searchBoxContainer:{},
    loginContainer:{},


});


class Header extends Component {
    constructor() {
        super()
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
                            <FastfoodIcon/>
                        </IconButton>
                        </div>
                        <div className={classes.searchBoxContainer}>
                            Search box
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