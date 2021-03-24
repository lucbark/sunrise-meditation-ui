import React from "react";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthenticationService from "../services/AuthenticationService.js";

export default function LoginSuccess() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    const username = AuthenticationService.getLoggedInUserName();
    const userId = AuthenticationService.persistLoggedInUserId();

    console.log("isUserLoggedIn : " , isUserLoggedIn);
    console.log("username : " , username);
    console.log("userId : " , userId);

    const classes = useStyles();
    return (
        <Container>
            <h1>
            Welcome {username}!
            </h1>

            <h3>
            Hours Meditated:
                <br/>
            Weekly Goal:
                <br/>
            Current Streak:
                <br/>
            </h3>



            <div className={classes.userDataGraph}>
                Graph/Use data goes here
            </div>
            <div className={classes.meditateButton}>
                <Link href="/meditation">
                    <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    className= "navButton"
                    >
                        Begin Meditating
                    </Button>
                </Link>
            </div>
            
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    meditateButton: {
        marginTop: theme.spacing(),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },

    userDataGraph: {
        marginTop: theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}));
