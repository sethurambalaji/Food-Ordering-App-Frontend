import React, { Component } from 'react'
import '../header/Header.css'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
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
                        <div>
                            Logo
                        </div>
                        <div>
                            Search box
                        </div>
                        <div>
                            Login
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

        )
    }

}
export default withStyles(styles)(Header);