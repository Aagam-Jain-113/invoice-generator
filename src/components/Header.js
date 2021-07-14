import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import firebaseApp from "../firebase";
import { AuthContext } from "../Auth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background: 'red'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        background: 'red'
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Invoice Generator
                        </Typography>
                        <Button color="inherit"><Link to="/generate" className="generate" >Generate Invoice</Link></Button>
                        <Button color="inherit"><Link to="/login" className="generate" >Login / Signup</Link></Button>
                        <Button color="inherit"><Link to="/invoice-generator" className="generate" ><HomeIcon /></Link></Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
    else {
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Invoice Generator
                        </Typography>
                        <Button color="inherit"><Link to="/generate" className="generate" >Generate Invoice</Link></Button>
                        <Button color="inherit"><Link to="/invoices" className="invoices" >Invoices</Link></Button>
                        <Button color="inherit" onClick={() => firebaseApp.auth().signOut()}>Sign out</Button>
                        <Button color="inherit"><Link to="/invoice-generator" className="generate" ><HomeIcon /></Link></Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
