import React, { Component } from "react";
import {Button, Typography }from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core";
import { withRouter } from 'react-router';

import AuthenticationService from "./services/AuthenticationService.js";


class NavBar extends Component {

  render(){

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return(
    <AppBar color={this.props.color} size={this.props.size} className="navBar">
      <Toolbar>
      <Link to="/">
        <Typography variant="h4">
          <Button>Sunrise Meditation</Button>
          </Typography>
        </Link>
        <Link to="/meditation">
          <Button className="navButton">Meditation</Button>
        </Link>
        <Link to="/learnAbout">
          <Button className="navButton">Learn About Meditation</Button>
        </Link>
        <Link to="/benefits">
          <Button className="navButton">Benefits</Button>
        </Link>
        {isUserLoggedIn && <Link to="/profile"><Button className="navButton">User Profile</Button></Link>}
        {!isUserLoggedIn && <Link to="/login"><Button className="navButton">Login</Button></Link>}
        {!isUserLoggedIn && <Link to="/register"><Button className="navButton">Registration</Button></Link>}
        {isUserLoggedIn && <Link to="/" onClick={AuthenticationService.logout}><Button className="navButton">Logout</Button></Link>}
      </Toolbar>
    </AppBar>)
  }
}

export default withRouter(NavBar);

